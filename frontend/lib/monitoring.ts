import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

type UserContext = { id: string; email?: string; [key: string]: any };
type BreadcrumbData = Record<string, any>;
type PerformanceLevel = 'info' | 'warning' | 'error';

// --- Sentry Initialization ---
export function initSentry() {
  Sentry.init({
    dsn: process.env.VITE_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          window.location,
          React.useNavigate
        ),
      }),
    ],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.01,
    replaysOnErrorSampleRate: 1.0,
    release: process.env.VITE_APP_VERSION,
    beforeSend(event, hint) {
      if (process.env.NODE_ENV === 'production') {
        const error = hint.originalException;
        if (
          event.exception &&
          error instanceof TypeError &&
          error.message.includes('fetch')
        ) {
          return null;
        }
        if (
          event.message?.includes('User rejected') ||
          event.message?.includes('MetaMask not detected')
        ) {
          return null;
        }
      }
      return event;
    },
    initialScope: {
      tags: { component: 'frontend' },
    },
  });
}

// --- Error Boundary ---
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => (
  <Sentry.ErrorBoundary fallback={fallback || DefaultErrorFallback}>
    {children}
  </Sentry.ErrorBoundary>
);

// --- Default Error Fallback ---
const DefaultErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({
  error,
  resetError,
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.5 0L3.732 16.5c-.77.833.1[...]"/>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-6">
        We're sorry, but something unexpected happened. Our team has been notified.
      </p>
      <div className="space-y-3">
        <button
          onClick={resetError}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => (window.location.href = '/')}
          className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Go Home
        </button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-6 text-left">
          <summary className="cursor-pointer text-sm text-gray-500">
            Error Details (Development)
          </summary>
          <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  </div>
);

// --- Sentry Utilities ---
export const captureError = (error: Error, context?: Record<string, any>) =>
  Sentry.captureException(error, { extra: context });

export const captureMessage = (
  message: string,
  level: PerformanceLevel = 'info'
) => Sentry.captureMessage(message, level);

export const setUserContext = (user: UserContext) => Sentry.setUser(user);

export const addBreadcrumb = (
  message: string,
  category?: string,
  data?: BreadcrumbData
) => {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: 'info',
  });
};

// --- Performance Monitoring ---
export const startTransaction = (name: string, op: string) =>
  Sentry.startTransaction({ name, op });

export const measurePerformance = async <T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> => {
  const transaction = startTransaction(name, 'function');
  try {
    const result = await operation();
    transaction.setStatus('ok');
    return result;
  } catch (error) {
    transaction.setStatus('internal_error');
    throw error;
  } finally {
    transaction.finish();
  }
};

// --- Web Vitals Monitoring ---
export const initWebVitals = () => {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    const breadcrumb = (name: string, metric: any) =>
      Sentry.addBreadcrumb({
        message: `${name}: ${metric.value}`,
        category: 'web-vital',
        data: metric,
      });

    getCLS(metric => breadcrumb('CLS', metric));
    getFID(metric => breadcrumb('FID', metric));
    getFCP(metric => breadcrumb('FCP', metric));
    getLCP(metric => breadcrumb('LCP', metric));
    getTTFB(metric => breadcrumb('TTFB', metric));
  });
};
