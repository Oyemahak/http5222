import express from 'express';
import path from 'path';
const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || "8888";

// Set pug as template engine for view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Home route - Updated single route handler
app.get('/', (request, response) => {
    const products = [
        {
            name: "Wireless Headphones",
            price: 99.99,
            description: "Premium noise-cancelling wireless headphones",
            image: "/images/headphone.png"
        },
        {
            name: "Smart Watch",
            price: 199.99,
            description: "Track your fitness and stay connected",
            image: "/images/watch.png"
        },
        {
            name: "Aurora 4K Projector",
            price: 1299.99,
            description: "True 4K HDR with 3000 ANSI lumens",
            image: "/images/projector.png",
        },
        {
            name: "Polaris Foldable Drone",
            price: 899.99,
            description: "8K camera with 40min flight time",
            image: "/images/drone.png",
        }
    ];
    /* Image credits:
       headphone.png - OpenAI. (2025). AI-generated image. Created using DALL·E on ChatGPT. https://chat.openai.com/
       watch.png - OpenAI. (2025). AI-generated image. Created using DALL·E on ChatGPT. https://chat.openai.com/
       projector.jpg - OpenAI. (2025). AI-generated image. Created using DALL·E on ChatGPT. https://chat.openai.com/
       drone.png - OpenAI. (2025). AI-generated image. Created using DALL·E on ChatGPT. https://chat.openai.com/
    */
    response.render('index', {
        title: 'Home',
        siteName: 'MadStore',
        products
    });
});

// About route
app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About Us',
        siteName: 'MadStore'
    });
});

// Error handling middleware
app.use((err, request, response, next) => {
    console.error(err.stack);
    response.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});