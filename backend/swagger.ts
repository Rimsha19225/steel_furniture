import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Steel Furniture API',
      version: '1.0.0',
      description: 'API documentation for Steel Furniture e-commerce platform',
      contact: {
        name: 'Steel Furniture Support',
        email: 'support@steelfurniture.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token'
        }
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            image: { type: 'string' },
            category: { type: 'string' },
            stock_quantity: { type: 'integer' },
            is_available: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            image: { type: 'string' },
            category: { type: 'string' },
            stock_quantity: { type: 'integer' }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        Review: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            user_id: { type: 'string', format: 'uuid' },
            product_id: { type: 'string', format: 'uuid' },
            rating: { type: 'integer', minimum: 1, maximum: 5 },
            review_text: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            order_number: { type: 'string' },
            total_amount: { type: 'number' },
            status: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.ts']
};

export const specs = swaggerJsdoc(options);
