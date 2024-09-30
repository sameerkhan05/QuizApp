import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar'; 

const ArticlesPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = (position / totalHeight) * 100;
      setScrollPosition(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-gray-900 to-black text-gray-300">
      <Navbar />

      <div style={{ width: `${scrollPosition}%` }} className="fixed top-0 left-0 h-1 bg-purple-600 z-50"></div>

      <header className="py-12 text-center">
        <motion.h1
          className="text-5xl font-extrabold text-purple-500 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Study Hub - Dive into Knowledge
        </motion.h1>
        <motion.p
          className="text-lg text-gray-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Explore detailed learning resources and enhance your skills.
        </motion.p>
      </header>

      <div className="px-4 sm:px-8 lg:px-16 space-y-20">
        
        <motion.div
          className="bg-gray-800 rounded-lg shadow-lg p-8 transition hover:bg-gray-700"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-purple-500 mb-4">React.js</h2>
          <p className="text-gray-300 mb-6">
            React is a JavaScript library developed by Facebook for building user interfaces, particularly single-page applications where you want a dynamic user experience. React's core philosophy revolves around the concept of components, which are reusable UI elements that manage their own state. This modular approach allows for better organization and code reuse, making it easier to develop and maintain complex applications.
          </p>
          <p className="text-gray-300 mb-6">
            One of the standout features of React is the Virtual DOM, a lightweight copy of the actual DOM. When changes are made, React first updates the Virtual DOM and then determines the most efficient way to update the actual DOM, significantly improving performance. This process of reconciliation ensures that user interactions are smooth and responsive.
          </p>
          <p className="text-gray-300 mb-6">
            State management in React can be achieved through built-in hooks like `useState` and `useReducer`, or external libraries like Redux or Context API. This allows for a clear separation of concerns, making it easier to manage application state across various components.
          </p>
          <p className="text-gray-300 mb-6">
            React also supports a component lifecycle, which allows developers to hook into different stages of a component's existence. This includes methods like `componentDidMount` and `componentWillUnmount`, enabling developers to perform actions like data fetching or cleanup operations.
          </p>
          <p className="text-gray-300 mb-6">
            Another significant feature of React is the ability to create custom hooks, which are JavaScript functions that allow you to encapsulate reusable logic. This leads to cleaner code and improved separation of concerns.
          </p>
          <div className="text-gray-400 space-y-4">
            <h3 className="text-2xl font-semibold text-purple-400">Core Features</h3>
            <ul className="list-disc list-inside pl-6">
              <li>Component-based architecture for reusability and modular design.</li>
              <li>Virtual DOM for efficient rendering and updates.</li>
              <li>State and props for dynamic data handling.</li>
              <li>Hooks for managing state and lifecycle in functional components.</li>
              <li>Rich ecosystem of libraries and tools (e.g., React Router, Axios).</li>
            </ul>

            <h3 className="text-2xl font-semibold text-purple-400">Interesting Facts</h3>
            <ul className="list-disc list-inside pl-6">
              <li>React was initially developed for Facebook's news feed.</li>
              <li>It is used by many popular applications like Instagram, WhatsApp, and Netflix.</li>
              <li>React has a large community and extensive documentation, making it easier to find solutions to problems.</li>
              <li>Many companies are adopting React for their front-end development due to its performance and scalability.</li>
            </ul>
          </div>
        </motion.div>

        {/* Java Section */}
        <motion.div
          className="bg-gray-800 rounded-lg shadow-lg p-8 transition hover:bg-gray-700"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-purple-500 mb-4">Java</h2>
          <p className="text-gray-300 mb-6">
            Java is a versatile and widely-used programming language that is class-based, object-oriented, and designed to have as few implementation dependencies as possible. This language is particularly known for its platform independence, achieved through the use of the Java Virtual Machine (JVM), which allows Java programs to run on any device that has the JVM installed, making it a popular choice for cross-platform applications.
          </p>
          <p className="text-gray-300 mb-6">
            Java's syntax is similar to C++, making it easier for programmers familiar with those languages to adapt. It follows the principle of "Write Once, Run Anywhere" (WORA), meaning that code written in Java can be executed on any system that has the JVM, providing a significant advantage in terms of portability.
          </p>
          <p className="text-gray-300 mb-6">
            The language is known for its robust memory management through automatic garbage collection, which helps prevent memory leaks and manage resources efficiently. Java also features strong exception handling capabilities, making it easier to build resilient applications.
          </p>
          <p className="text-gray-300 mb-6">
            Java has a rich set of APIs, frameworks, and libraries that simplify development tasks. Popular frameworks like Spring and Hibernate are widely used for enterprise-level applications, while JavaFX provides a platform for building rich desktop applications.
          </p>
          <p className="text-gray-300 mb-6">
            With its strong community support, extensive documentation, and a wealth of resources for learning, Java remains one of the top choices for software development, particularly in large-scale enterprise applications and Android app development.
          </p>
          <div className="text-gray-400 space-y-4">
            <h3 className="text-2xl font-semibold text-purple-400">Core Features</h3>
            <ul className="list-disc list-inside pl-6">
              <li>Object-oriented programming model, facilitating code reuse and abstraction.</li>
              <li>Platform independence via Java Virtual Machine (JVM), enabling cross-platform applications.</li>
              <li>Robust memory management and automatic garbage collection to optimize resource usage.</li>
              <li>Rich set of APIs and libraries for diverse applications, from web to mobile development.</li>
              <li>Strong community support and extensive documentation for developers.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-purple-400">Interesting Facts</h3>
            <ul className="list-disc list-inside pl-6">
              <li>Java powers over 3 billion devices worldwide, from smartphones to enterprise servers.</li>
              <li>It is the primary language for Android app development, making it essential for mobile developers.</li>
              <li>Java was originally developed by Sun Microsystems in 1995 and is now owned by Oracle Corporation.</li>
              <li>The Java Community Process (JCP) allows developers to propose changes and improvements to the language.</li>
            </ul>
          </div>
        </motion.div>

        {/* Python Section */}
        <motion.div
          className="bg-gray-800 rounded-lg shadow-lg p-8 transition hover:bg-gray-700"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-purple-500 mb-4">Python</h2>
          <p className="text-gray-300 mb-6">
            Python is a high-level, interpreted programming language known for its clear syntax and readability. It emphasizes code readability and simplicity, which makes it an excellent choice for beginners and experienced programmers alike. Python's design philosophy promotes the use of fewer lines of code, making it more efficient for developers to write and maintain code.
          </p>
          <p className="text-gray-300 mb-6">
            The language supports multiple programming paradigms, including procedural, object-oriented, and functional programming. This flexibility allows developers to choose the best approach for their specific project needs. Python also boasts an extensive standard library, providing modules and functions for a wide range of programming tasks.
          </p>
          <p className="text-gray-300 mb-6">
            Python has gained immense popularity in data science and machine learning, thanks to powerful libraries like NumPy, Pandas, and scikit-learn. These tools enable efficient data manipulation and analysis, making Python a go-to language for data scientists and analysts.
          </p>
          <p className="text-gray-300 mb-6">
            The language is also widely used in web development with frameworks like Django and Flask, which streamline the development process and promote best practices. These frameworks provide robust tools for building scalable web applications quickly and efficiently.
          </p>
          <p className="text-gray-300 mb-6">
            Additionally, Python is increasingly used in automation and scripting, allowing developers to automate repetitive tasks and improve workflow efficiency. Its simplicity and versatility make it suitable for a wide range of applications, from web development to scientific computing.
          </p>
          <div className="text-gray-400 space-y-4">
            <h3 className="text-2xl font-semibold text-purple-400">Core Features</h3>
            <ul className="list-disc list-inside pl-6">
              <li>Readable and concise syntax that promotes quick learning and efficiency.</li>
              <li>Dynamic typing and memory management simplify code writing and debugging.</li>
              <li>Extensive libraries for data science, AI, web development, and automation.</li>
              <li>Community-driven development with strong support and resources.</li>
              <li>Integration capabilities with other languages and tools, enhancing versatility.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-purple-400">Interesting Facts</h3>
            <ul className="list-disc list-inside pl-6">
              <li>Python is named after the British comedy group Monty Python, not the snake.</li>
              <li>It is one of the fastest-growing programming languages in popularity.</li>
              <li>Python is used by major tech companies like Google, Facebook, and Instagram.</li>
              <li>The language is known for its active community, contributing to a wealth of resources and libraries.</li>
            </ul>
          </div>
        </motion.div>

        {/* Node.js Section */}
        <motion.div
          className="bg-gray-800 rounded-lg shadow-lg p-8 transition hover:bg-gray-700"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-purple-500 mb-4">Node.js</h2>
          <p className="text-gray-300 mb-6">
            Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code server-side. It is built on the V8 JavaScript engine used in Google Chrome and is designed to build scalable network applications. Node.js operates on a non-blocking, event-driven architecture, which means it can handle multiple connections concurrently without getting bogged down by blocking operations.
          </p>
          <p className="text-gray-300 mb-6">
            One of the standout features of Node.js is its ability to use JavaScript on both the client and server sides, enabling developers to use a single language throughout the entire stack. This reduces the learning curve and allows for seamless communication between the client and server.
          </p>
          <p className="text-gray-300 mb-6">
            Node.js excels in building real-time applications such as chat applications, online gaming, and collaborative tools, where low latency and high performance are critical. Its event-driven model allows for rapid data exchange, making it ideal for applications that require constant updates.
          </p>
          <p className="text-gray-300 mb-6">
            The npm (Node Package Manager) ecosystem is a significant advantage of Node.js, providing access to a vast library of open-source packages and modules. Developers can easily integrate third-party libraries and tools, speeding up development and reducing the need to reinvent the wheel.
          </p>
          <p className="text-gray-300 mb-6">
            Additionally, Node.js is commonly used in microservices architecture, allowing developers to build modular applications that can be easily scaled and maintained. This architectural approach promotes better organization and separation of concerns in complex applications.
          </p>
          <div className="text-gray-400 space-y-4">
            <h3 className="text-2xl font-semibold text-purple-400">Core Features</h3>
            <ul className="list-disc list-inside pl-6">
              <li>Non-blocking, event-driven architecture for high performance and scalability.</li>
              <li>Single language for both client-side and server-side development.</li>
              <li>Rich npm ecosystem with a vast array of open-source packages.</li>
              <li>Ideal for real-time applications and microservices architecture.</li>
              <li>Strong community support and extensive documentation available.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-purple-400">Interesting Facts</h3>
            <ul className="list-disc list-inside pl-6">
              <li>Node.js was created by Ryan Dahl in 2009 and has since gained massive popularity.</li>
              <li>It powers applications for companies like LinkedIn, Netflix, and PayPal.</li>
              <li>Node.js enables developers to write server-side applications in JavaScript, reducing the need to switch languages.</li>
              <li>The technology is increasingly being used in IoT applications for its lightweight nature.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticlesPage;
