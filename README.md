# Arpeggio Music Store 🎼

### 🔗 [Visit the live site](https://fedelopez17.github.io/arpeggio-music-store/) 🎸🎹 🎷

## Description:

Arpeggio Music Store is a fictional store with a wide range of musical instruments and related products to choose from.<br> Users can explore the catalog, filter by type, search for specific products, sort items by price, rating, brand, or name, and easily add products to their favorites or shopping cart.

## Video Demonstration:

https://github.com/user-attachments/assets/2c875081-b3ae-4954-95aa-7502745d7d99

[Watch uncompressed video on YouTube](https://youtu.be/avZqgca11J4)

## Technologies used:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![React Testing Library](https://img.shields.io/badge/-Testing%20Library-E33332?logo=testing%20library&logoColor=white&style=for-the-badge)

## New things learned:

Through this project, I had the opportunity to deepen my understanding and build confidence in using React Router, a powerful client-side routing framework that enables seamless navigation within Single Page Applications.<br>
In addition, I explored testing methodologies in React, utilizing Vitest in conjunction with React Testing Library. This combination allowed me to effectively create both unit and integration tests, ensuring the reliability and functionality of my components. I was able to mock callbacks, components, and dependencies, which was crucial for testing more complex interactions within the application.

## Problems encountered:

The first challenge I faced while planning this project was finding an appropriate API to use. I wanted my project to resemble a real online store, but most free public APIs had clearly fake products, which didn't meet my needs. Although I found some promising APIs, like Best Buy's, I was unable to obtain an API key. As a result, I decided to forgo using an external API altogether and instead opted to scrape data from Thomann's website to build my own product catalog. I went with their website specifically because I'm really into musical instruments, gear and everything related, so I end up on their website almost daily.<br>

The second challenge I encountered, related to the aforementioned, was managing the product images. I stored all images in my assets directory, but I faced difficulties dynamically importing them using Vite. Vite's [glob import feature](https://vitejs.dev/guide/features#glob-import) would have been ideal for dynamically importing all images within a directory, but it doesn't support template literals or variables as the path, which I needed since the image paths were not predetermined.

To solve this, I considered using the ESM's native feature [import.meta.url with the URL constructor](https://vitejs.dev/guide/assets#new-url-url-import-meta-url), which allows for obtaining the full, resolved URL of a static asset. However, I didn't know the exact number of images for each product, as they varied in quantity. While I could have worked around this, I believed there was a better solution.

That's when I discovered Octokit and the GitHub REST API. With it, I was able to dynamically fetch all images within a specified path in my repository, which suited my needs perfectly. However, once implemented, this approach resulted in longer load times for the images than I was comfortable with.<br>

Ultimately, I decided to discard this approach and, since my repository is public, use the direct URLs of the images from my repository as the source attribute for the images instead. Because the product images are named numerically, I created a function that uses a binary search to determine the number of images available for each product, ensuring I loaded the correct amount of images.

## Things I could've done better:

### Prop drilling:

Among the many things I could've done better, one that comes to mind is state management.<br>
As GeeksForGeeks puts it,

> Prop drilling is basically a situation when the same data is being sent at almost every level due to requirements in the final level.<br>
> [read full article](https://www.geeksforgeeks.org/what-is-prop-drilling-and-how-to-avoid-it/#what-is-prop-drilling)

Or, in my own words, prop drilling is when you pass props to components that don't need them, just for them to also pass them down, and eventually reach the component that actually needs those props.<br>
I'm aware now that I should've used contexts to get rid of unnecessary prop drilling. Likewise, I also realize now that I should've used reducers to improve state management, especially in the App component.

### Responsiveness:

Despite Arpeggio Music Store being somewhat responsive and usable in mobile devices and tablets, the overall user experience in such devices could definitely be improved.

## Thoughts on the project:

I really enjoyed building this project. It not only allowed me to practice and improve on technologies like React, Tailwind, or TypeScript, but also to learn new technologies such as React Router and React Testing Library, which I'll be using in future projects.<br>
Overall, I'm content with the outcome.<br>

**All feedback is appreciated, feel free to reach out!**
