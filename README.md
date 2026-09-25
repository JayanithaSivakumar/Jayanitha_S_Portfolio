# Personal Portfolio Website

A modern, responsive portfolio website built with HTML, Tailwind CSS, and vanilla JavaScript featuring light/dark theme support.

## Features

✨ **Modern Design**
- Clean, professional layout with teal accent color
- Two-column hero section with illustrated character
- Responsive design that works on all devices
- Smooth animations and transitions

🌙 **Theme Support**
- Light and dark mode toggle
- Persistent theme preference in localStorage
- Smooth theme transitions

📱 **Responsive Layout**
- Mobile-first design approach
- Responsive navigation with mobile menu
- Optimized for tablets and desktop

🎨 **Interactive Elements**
- Smooth scrolling navigation
- Hover effects on portfolio cards
- Form validation with real-time feedback
- Scroll-to-top button
- Parallax effects on larger screens

📋 **Sections Included**
- Hero section with call-to-action
- About me with skills and statistics
- Portfolio gallery with project cards
- Contact form with validation
- Professional footer

## Getting Started

1. **Clone or download** this repository to your local machine
2. **Customize the content** in `index.html`:
   - Replace "Your Name" with your actual name
   - Update the hero section text and description
   - Modify the About Me section with your information
   - Replace project cards in the Portfolio section
   - Update contact information and social links

3. **Open `index.html`** in your web browser to view the site

## Customization Guide

### Personal Information
Update these sections in `index.html`:

```html
<!-- Name and Title -->
<h1 class="text-xl font-bold gradient-text">Your Name</h1>
<span class="gradient-text">Your Name</span>
<span class="text-gray-600 dark:text-gray-300">Web Developer</span>

<!-- About Me Content -->
<p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
    Your personal description here...
</p>

<!-- Contact Information -->
<p class="text-gray-600 dark:text-gray-300">your.email@example.com</p>
<p class="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
<p class="text-gray-600 dark:text-gray-300">Your City, Country</p>
```

### Portfolio Projects
Replace the project cards with your own work:

```html
<div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden card-hover">
    <!-- Project image/preview -->
    <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500">
        <!-- Add your project screenshot here -->
    </div>
    <div class="p-6">
        <h3 class="text-xl font-bold mb-2">Your Project Name</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
            Project description...
        </p>
        <!-- Update technology tags -->
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded">Technology</span>
        </div>
        <!-- Update project links -->
        <div class="flex space-x-4">
            <a href="#" class="text-teal-500 hover:text-teal-600 font-medium">Live Demo</a>
            <a href="#" class="text-teal-500 hover:text-teal-600 font-medium">GitHub</a>
        </div>
    </div>
</div>
```

### Skills and Technologies
Update the skills section:

```html
<div class="flex flex-wrap gap-3">
    <span class="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm">Your Skill</span>
    <!-- Add more skills -->
</div>
```

### Social Links
Update social media links in the footer and contact section:

```html
<a href="https://twitter.com/yourusername" class="text-gray-400 hover:text-teal-400 transition-colors">
    <!-- Twitter SVG -->
</a>
```

## Color Customization

The site uses a teal color scheme. To change the accent color, update the Tailwind configuration in the `<script>` tag:

```javascript
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'teal': {
                    // Update these values for your preferred color
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    // ... more shades
                }
            }
        }
    }
}
```

## File Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Technologies Used

- **HTML5** - Semantic markup structure
- **Tailwind CSS** - Utility-first CSS framework (CDN)
- **Vanilla JavaScript** - Interactive functionality
- **Local Storage** - Theme preference persistence

## Browser Support

This website supports all modern browsers including:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Features

- **Lazy Loading** - Images and animations load as needed
- **Responsive Images** - Optimized for different screen sizes
- **Minimal JavaScript** - Fast loading and execution
- **CSS Animations** - Hardware-accelerated transitions

## Accessibility Features

- **Semantic HTML** - Proper heading hierarchy and landmarks
- **Keyboard Navigation** - All interactive elements are keyboard accessible
- **Focus Indicators** - Clear focus states for all interactive elements
- **Alt Text** - Descriptive text for images (add your own)
- **Color Contrast** - WCAG compliant color combinations

## Hosting

This is a static website that can be hosted on:
- **GitHub Pages** (free)
- **Netlify** (free tier available)
- **Vercel** (free tier available)
- **Firebase Hosting** (free tier available)
- Any web hosting service

### GitHub Pages Deployment

1. Create a new repository on GitHub
2. Upload your files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

## Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements that could benefit others, pull requests are welcome!

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you have any questions about this portfolio template, feel free to reach out!

---

**Happy coding!** 🚀