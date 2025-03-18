import React, { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import { Jumbotron } from "./migration";
import "./TechStack.css";

const TechStack = ({ heading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(5); // Default for desktop
  
  const technologies = [
    {
      name: "Python",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
    },
    {
      name: "PostgreSQL",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg"
    },
    {
      name: "FastAPI",
      icon: "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
    },
    {
      name: "Apache Airflow",
      icon: "https://static-00.iconduck.com/assets.00/airflow-icon-512x512-tpr318yf.png"
    },
    {
      name: "Docker",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg"
    },
    {
      name: "AWS",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
    },
    {
      name: "GCP",
      icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg"
    },
    {
      name: "Terraform",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg"
    },
    {
      name: "Apache Spark",
      icon: "https://www.vectorlogo.zone/logos/apache_spark/apache_spark-icon.svg"
    },
    {
      name: "Snowflake",
      icon: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg"
    },
    {
      name: "dbt",
      icon: "https://seeklogo.com/images/D/dbt-logo-500AB0BAA7-seeklogo.com.png"
    },
    {
      name: "Kafka",
      icon: "https://www.vectorlogo.zone/logos/apache_kafka/apache_kafka-icon.svg"
    },
    {
      name: "Power BI",
      icon: "https://raw.githubusercontent.com/microsoft/PowerBI-Icons/main/SVG/Power-BI.svg"
    },
    {
      name: "Postman",
      icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
    },
    {
      name: "MongoDB",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth <= 768 ? 3 : 5);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(technologies.length / itemsPerSlide);

  const getSlideItems = (slideIndex) => {
    const start = slideIndex * itemsPerSlide;
    return technologies.slice(start, start + itemsPerSlide);
  };

  const getSlideClassName = (slideIndex) => {
    if (slideIndex === currentSlide) return 'active';
    if (slideIndex === previousSlide) return 'inactive';
    return '';
  };

  const handleDotClick = (index) => {
    setPreviousSlide(currentSlide);
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setPreviousSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused, totalSlides]);

  return (
    <Jumbotron fluid id="skills" className="bg-white m-0">
      <Container>
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <div className="tech-slider-container">
          <div className="tech-slider">
            {[...Array(totalSlides)].map((_, slideIndex) => (
              <div 
                key={slideIndex}
                className={`tech-slide ${getSlideClassName(slideIndex)}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {getSlideItems(slideIndex).map((tech, index) => (
                  <div key={`${slideIndex}-${index}`} className="tech-icon-wrapper">
                    <img 
                      src={tech.icon} 
                      alt={tech.name}
                      className="tech-icon"
                      title={tech.name}
                    />
                    <p className="tech-name">{tech.name}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="slider-dots">
            {[...Array(totalSlides)].map((_, index) => (
              <span 
                key={index} 
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </Jumbotron>
  );
};

export default TechStack; 