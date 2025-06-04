import React, { useEffect, useState } from "react";
import { Navbar } from "../commn/Navbar";
import image1 from "../image/ima41.png";
import image2 from "../image/ima51.png";
import image3 from "../image/ima61.png";
import image4 from "../image/ima411.png";
import image5 from "../image/ima511.png";
import image6 from "../image/ima611.png";
import "../style/css/client/home.css";
import { About } from "./home/About";
import { Contact } from "./home/Contact";
import { Object } from "./home/Object";
import { Product } from "./home/Product";
import { HomeNews } from "./home/HomeNews";
import Search from "../search/Search";

export const Home = () => {
  const sl = {
    transition: "ease 1ms",
  };

  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [chatbotLoaded, setChatbotLoaded] = useState(false);

  useEffect(() => {
    // Function to dynamically load WebChat library
    const loadWebChatLibrary = () => {
      return new Promise((resolve, reject) => {
        if (window.WebChat) {
          resolve(window.WebChat);
        } else {
          const script = document.createElement("script");
          script.src = "https://cdn.botframework.com/botframework-webchat/latest/webchat.js";
          script.onload = () => resolve(window.WebChat);
          script.onerror = () => reject(new Error("WebChat library failed to load"));
          document.body.appendChild(script);
        }
      });
    };

    // Function to load the chatbot when the user clicks the icon
    const loadChatbot = async () => {
      try {
        const WebChat = await loadWebChatLibrary();
        const response = await fetch("http://127.0.0.1:5000/get_token_placement");
        const key = await fetch("http://127.0.0.1:5000/get_key");
        const data = await response.json();
        const keydata = await key.json();

        if (!data.token || !keydata.speechKey || !keydata.speechRegion) {
          console.error("Missing chatbot configuration.");
          return;
        }

        const directLine = WebChat.createDirectLine({ token: data.token });

        const speechPonyfillFactory = await WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
          credentials: {
            region: keydata.speechRegion,
            subscriptionKey: keydata.speechKey
          }
        });

        WebChat.renderWebChat(
          {
            directLine: directLine,
            userID: "user-123",
            username: "User",
            locale: "en-US",
            styleOptions: {
              botAvatarInitials: "AI",
              userAvatarInitials: "U",
              bubbleBackground: "#F1F1F1",
              bubbleFromUserBackground: "#0078D7",
              bubbleFromUserTextColor: "white"
            },
            webSpeechPonyfillFactory: speechPonyfillFactory
          },
          document.getElementById("webchat")
        );

        console.log("Chatbot loaded successfully!");
      } catch (error) {
        console.error("Error loading chatbot:", error);
      }
    };

    if (chatbotVisible && !chatbotLoaded) {
      loadChatbot();
      setChatbotLoaded(true);
    }
  }, [chatbotVisible, chatbotLoaded]);

  return (
    <div style={{ position: "relative" }}>
      <div>
        <section>
          <Navbar className="" />
        </section>
      </div>
      <div>
        <section>
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide d-img"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active em-image" style={sl}>
                <img
                  className="d-block w-100 h-100"
                  src={image1}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item em-image" style={sl}>
                <img
                  className="d-block w-100 h-100"
                  src={image2}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item em-image" style={sl}>
                <img
                  className="d-block w-100 h-100"
                  src={image3}
                  alt="Third slide"
                />
              </div>
            </div>
          </div>
          {/* for mobile view */}
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide m-img"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active em-image" style={sl}>
                <img
                  className="d-block w-100 h-100"
                  src={image4}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item em-image" style={sl}>
                <img
                  className="d-block w-100 h-100"
                  src={image5}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item em-image" style={sl}>
                <img
                  className="d-block w-100 h-100"
                  src={image6}
                  alt="Third slide"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Background Overlay */}
      {chatbotVisible && (
        <div
          onClick={() => setChatbotVisible(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            marginBottom: "25px",
          }}
        />
      )}

      {/* Chatbot Icon */}
      <div
          id="chatbot-icon"
          onClick={() => setChatbotVisible(true)}
          style={{
            position: "fixed",
            bottom: "10px",
            right: "20px",
            width: "130px", 
            height: "40px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0px 0px 8px rgba(0, 0, 255, 0.5)",
            borderRadius: "20px", 
            zIndex: 10000,
            border: "2px solid #A0C3FF", 
            fontSize: "16px",
            fontWeight: "bold",
            color: "#1D4ED8",
            padding: "10px 25px"
          }}
        >
        <span style={{color: "#1D4ED8", fontSize: "25px", fontWeight: "bold", marginRight: "5px"}}>» </span>
        <span> Ask AI</span>
      </div>

      {/* Chatbot Window */}
      {chatbotVisible && (
        <div
          id="chatbot-container"
          style={{
            position: "fixed",
            bottom: "50px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1001,
          }}
        >
          <span
            id="close-chatbot"
            onClick={() => 
              setChatbotVisible(false)}
            style={{
              position: "absolute",
              top: "5px",
              right: "10px",
              background: 'transparent',
              border: 'none',
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#FF0000",
              zIndex: 1002,
            }}
          >
            ×
          </span>
          <div id="webchat" style={{ width: "100%", height: "100%" }}></div>
        </div>
      )}

        <Object />
        <About />
        <Product />
        <HomeNews />
        <Search />
        <br />
        {/* <Search details={initialDetails}/> */}
        <Contact />
    
    </div>
  </div>
  );
};
