module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'triggerfun',
    // Database connection information
    'database': 'mongodb://localhost:27017',
    // Setting port for server
    'port': process.env.PORT || 3000,
    
    'limits': {
        'monitor': {
            'graph': { 'woozy': 30, 'sick': 125 },
            'timeline': { 'woozy': 0.03, 'sick': 0.10 }
        },
        'statistics': {
            'graph': { 'woozy': 1000, 'sick': 6000 },
            'table': { 'woozy': 0.01, 'sick': 0.06 }
        }
    }
};