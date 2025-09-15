CREATE TABLE public.api_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    endpoint character varying(255) NOT NULL,
    count integer DEFAULT 1,
    cost numeric(20,8) DEFAULT 0,
    created_at timestamp without time zone DEFAULT now()
);
CREATE TABLE public.blog_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug character varying(150) NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    author_id uuid,
    created_at timestamp without time zone DEFAULT now()
);
CREATE TABLE public.contacts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    message text NOT NULL,
    status character varying(20) DEFAULT 'new'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT contacts_status_check CHECK (((status)::text = ANY ((ARRAY['new'::character varying, 'read'::character varying, 'resolved'::character varying])::text[])))
);
CREATE TABLE public.contracts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    name character varying(100) NOT NULL,
    type character varying(20) NOT NULL,
    source_code text,
    deployed_address character varying(255),
    chain character varying(20) NOT NULL,
    status character varying(20) DEFAULT 'draft'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT contracts_chain_check CHECK (((chain)::text = ANY ((ARRAY['ethereum'::character varying, 'bnb'::character varying, 'solana'::character varying, 'polygon'::character varying])::text[]))),
    CONSTRAINT contracts_status_check CHECK (((status)::text = ANY ((ARRAY['draft'::character varying, 'deployed'::character varying, 'failed'::character varying])::text[]))),
    CONSTRAINT contracts_type_check CHECK (((type)::text = ANY ((ARRAY['erc20'::character varying, 'erc721'::character varying, 'custom'::character varying])::text[])))
);
CREATE TABLE public.docs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug character varying(150) NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);
CREATE TABLE public.nfts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    contract_id uuid,
    token_id character varying(100) NOT NULL,
    metadata_url text,
    owner_address character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);
CREATE TABLE public.plans (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(50) NOT NULL,
    price numeric(20,2) NOT NULL,
    features jsonb,
    created_at timestamp without time zone DEFAULT now()
);
CREATE TABLE public.tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    contract_id uuid,
    symbol character varying(20) NOT NULL,
    name character varying(100) NOT NULL,
    supply bigint NOT NULL,
    decimals integer DEFAULT 18,
    created_at timestamp without time zone DEFAULT now()
);
CREATE TABLE public.transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    wallet_id uuid,
    tx_hash character varying(255),
    chain character varying(20) NOT NULL,
    type character varying(50) NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying,
    gas_fee numeric(20,8),
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT transactions_chain_check CHECK (((chain)::text = ANY ((ARRAY['ethereum'::character varying, 'bnb'::character varying, 'solana'::character varying, 'polygon'::character varying])::text[]))),
    CONSTRAINT transactions_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'success'::character varying, 'failed'::character varying])::text[]))),
    CONSTRAINT transactions_type_check CHECK (((type)::text = ANY ((ARRAY['deploy_contract'::character varying, 'mint_token'::character varying, 'transfer'::character varying, 'nft_mint'::character varying])::text[])))
);
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying,
    plan character varying(20) DEFAULT 'starter'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT users_plan_check CHECK (((plan)::text = ANY ((ARRAY['starter'::character varying, 'pro'::character varying, 'enterprise'::character varying])::text[]))),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['user'::character varying, 'admin'::character varying])::text[])))
);
CREATE TABLE public.wallets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    type character varying(20) NOT NULL,
    address character varying(255) NOT NULL,
    chain character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT wallets_chain_check CHECK (((chain)::text = ANY ((ARRAY['ethereum'::character varying, 'bnb'::character varying, 'solana'::character varying, 'polygon'::character varying])::text[]))),
    CONSTRAINT wallets_type_check CHECK (((type)::text = ANY ((ARRAY['custodial'::character varying, 'non-custodial'::character varying])::text[])))
);