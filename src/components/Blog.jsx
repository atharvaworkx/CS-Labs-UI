import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaClock, FaArrowRight, FaCode, FaBrain, FaLaptopCode } from 'react-icons/fa';
import '../styles/Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Data Structure Problems Every GATE Aspirant Must Solve',
      excerpt: 'Master these essential data structure problems to build a strong foundation for GATE CS exam...',
      author: 'Dr. Rajesh Kumar',
      date: 'June 25, 2026',
      readTime: '8 min read',
      category: 'Data Structures',
      icon: FaCode,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Understanding Time Complexity: A Complete Guide',
      excerpt: 'Learn how to analyze algorithm efficiency and master Big O notation for competitive programming...',
      author: 'Priya Sharma',
      date: 'June 22, 2026',
      readTime: '12 min read',
      category: 'Algorithms',
      icon: FaBrain,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'GATE 2026 Preparation Strategy: Month-wise Plan',
      excerpt: 'A comprehensive roadmap to crack GATE CS with systematic preparation and practice schedule...',
      author: 'Amit Verma',
      date: 'June 20, 2026',
      readTime: '15 min read',
      category: 'Preparation',
      icon: FaLaptopCode,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Operating Systems: Process Synchronization Made Easy',
      excerpt: 'Understand semaphores, monitors, and critical sections with real-world examples and code...',
      author: 'Dr. Sneha Patel',
      date: 'June 18, 2026',
      readTime: '10 min read',
      category: 'Operating Systems',
      icon: FaCode,
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'Database Normalization: From 1NF to BCNF',
      excerpt: 'Master database design principles and normalization techniques for GATE DBMS questions...',
      author: 'Rohan Malhotra',
      date: 'June 15, 2026',
      readTime: '11 min read',
      category: 'DBMS',
      icon: FaBrain,
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop'
    },
    {
      id: 6,
      title: 'Computer Networks: TCP vs UDP Explained',
      excerpt: 'Deep dive into transport layer protocols with practical examples and GATE-focused questions...',
      author: 'Ananya Reddy',
      date: 'June 12, 2026',
      readTime: '9 min read',
      category: 'Networks',
      icon: FaLaptopCode,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
    }
  ];

  const categories = ['All', 'Data Structures', 'Algorithms', 'Operating Systems', 'DBMS', 'Networks', 'Preparation'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="blog-container">
      <motion.section
        className="blog-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="blog-hero-content">
          <motion.h1
            className="blog-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            CS Labs <span className="gradient-text">Blog</span>
          </motion.h1>
          <motion.p
            className="blog-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Expert insights, study tips, and strategies to ace GATE CS
          </motion.p>
        </div>
      </motion.section>

      <section className="blog-content">
        <div className="blog-container-inner">
          <motion.div
            className="blog-categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <div className="blog-grid">
            {filteredPosts.map((post, index) => {
              const Icon = post.icon;
              return (
                <motion.article
                  key={post.id}
                  className="blog-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(106, 13, 37, 0.15)' }}
                >
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} />
                    <div className="blog-category-badge">
                      <Icon />
                      <span>{post.category}</span>
                    </div>
                  </div>

                  <div className="blog-card-content">
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>

                    <div className="blog-card-meta">
                      <div className="meta-item">
                        <FaUser />
                        <span>{post.author}</span>
                      </div>
                      <div className="meta-item">
                        <FaCalendar />
                        <span>{post.date}</span>
                      </div>
                      <div className="meta-item">
                        <FaClock />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <motion.button
                      className="read-more-btn"
                      whileHover={{ x: 5 }}
                    >
                      Read More <FaArrowRight />
                    </motion.button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
