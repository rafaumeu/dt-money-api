I'll convert the document into a well-formatted Markdown README for the DT Money JSON Server deployment to Vercel.

# DT Money - JSON Server Deployment to Vercel 💰🚀

## Deployment Overview

This project demonstrates how to deploy the DT Money project's JSON Server to Vercel, enabling a live, hosted fake REST API for financial transactions.

## Project Structure

- **Database**: Transactions data from `server.json`
- **API Endpoint**: Provides RESTful access to financial transactions
- **Deployment**: Hosted on Vercel

## Features

- ✅ Full CRUD operations for transactions
- ✅ Pagination support
- ✅ Sorting and filtering capabilities
- ✅ Serverless deployment

## Deployment Steps

### Prerequisites

- GitHub Account
- Vercel Account
- Node.js installed

### Deployment Process

#### 1. Prepare Repository

```bash
# Clone the repository
git clone https://github.com/rafaumeu/dt-money.git
cd dt-money
```

#### 2. Create Vercel Configuration Files

- `db.json`: Database snapshot
- `api/server.js`: JSON Server configuration
- `vercel.json`: Deployment settings

#### 3. Install Dependencies

```bash
npm install json-server
```

#### 4. Configure Vercel Deployment

- Log in to Vercel
- Import GitHub repository
- Set framework preset to "Other"
- Deploy project

## API Endpoints

### Transactions

- `GET /api/transactions`: List all transactions
- `GET /api/transactions?_page=1&_limit=10`: Paginated transactions
- `GET /api/transactions?q=search_term`: Search transactions
- `POST /api/transactions`: Create new transaction
- `PUT /api/transactions/:id`: Update transaction
- `DELETE /api/transactions/:id`: Delete transaction

## Example Queries

### Fetch Transactions

```javascript
// Fetch first page with 10 items, sorted by date
fetch('https://your-vercel-deployment.vercel.app/api/transactions?_page=1&_limit=10&_sort=createdAt&_order=desc')
```

### Create Transaction

```javascript
fetch('https://your-vercel-deployment.vercel.app/api/transactions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    description: 'Freelance Work',
    price: 3000,
    type: 'income',
    category: 'Serviços',
    createdAt: new Date().toISOString()
  })
})
```

## Frontend Configuration

Update `src/lib/axios.ts`:

```typescript
export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://your-vercel-deployment.vercel.app/api' 
    : 'http://localhost:3333'
})
```

## Best Practices

- Always use environment variables for API URLs
- Implement proper error handling
- Add authentication for production (future enhancement)

## Technologies

- JSON Server
- Vercel
- TypeScript

## Troubleshooting

- Ensure CORS settings are correctly configured
- Check Vercel logs for deployment issues
- Verify API endpoint URLs

## Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

<p align="center"> Developed with 💜 by Rafael Dias Zendron <br> Powered by Vercel 🚀 </p>
