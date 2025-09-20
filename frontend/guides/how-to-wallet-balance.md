# How to Get Wallet Balance

## JavaScript
```js
fetch('/api/sandbox-proxy?endpoint=/wallets/0x123/balance', {
  headers: { Authorization: 'Bearer demo-auth-token-123' }
}).then(res => res.json())
  .then(data => console.log(data));
```

## Python
```python
import requests
resp = requests.get('https://api.velora/sandbox/wallets/0x123/balance',
  headers={"Authorization": "Bearer demo-auth-token-123"})
print(resp.json())
```

## Step-by-step
1. Login ke Playground.
2. Pilih endpoint "Get wallet balance".
3. Masukkan address wallet.
4. Run request dan lihat hasilnya di response viewer.