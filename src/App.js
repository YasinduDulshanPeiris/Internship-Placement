import React, { useState, useEffect } from "react";

const App = () => {
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [chatbotLoaded, setChatbotLoaded] = useState(false);

  useEffect(() => {
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

    const loadChatbot = async () => {
      try {
        // Fetch token from Flask server
        const response = await fetch("http://127.0.0.1:5002/get_token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token from server");
        }

        const data = await response.json();
        const token = data.token;

        if (!token) {
          throw new Error("No token received from server");
        }

        const WebChat = await loadWebChatLibrary();
        const directLine = WebChat.createDirectLine({ token });

        WebChat.renderWebChat(
          {
            directLine,
            userID: "user-001",
            username: "User",
            locale: "en-US",
            styleOptions: {
              botAvatarInitials: "AI",
              userAvatarInitials: "U",
              bubbleBackground: "#F1F1F1",
              bubbleFromUserBackground: "#0078D7",
              bubbleFromUserTextColor: "white",
              rootHeight: "100%",
              rootWidth: "100%",
            },
          },
          document.getElementById("webchat")
        );

        console.log("Chatbot loaded!");
        setChatbotLoaded(true);
      } catch (error) {
        console.error("Error loading chatbot:", error);
      }
    };

    if (chatbotVisible && !chatbotLoaded) {
      loadChatbot();
    }
  }, [chatbotVisible, chatbotLoaded]);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#1D4ED8", fontSize: "2.5rem", marginTop: "50px" }}>
        Welcome to Our AI Chat Assistant 🤖
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#333", marginTop: "10px" }}>
        Click the blue ball at the bottom-right to chat!
      </p>

      {/* Background overlay */}
      {chatbotVisible && (
        <div
          onClick={() => setChatbotVisible(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 999,
          }}
        />
      )}

      {/* Floating Ball (Chat Icon) */}
      <div
        onClick={() => setChatbotVisible(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          backgroundColor: "#2563EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "30px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
          zIndex: 1000,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0px 6px 15px rgba(0,0,0,0.4)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.3)";
        }}
      >
        💬
      </div>

      {/* Chatbot Window */}
      {chatbotVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "360px",
            height: "500px",
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0px 6px 18px rgba(0,0,0,0.3)",
            zIndex: 1001,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "10px",
              backgroundColor: "#1D4ED8",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            AI Assistant
            <span
              onClick={() => setChatbotVisible(false)}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#FFBABA",
              }}
            >
              ×
            </span>
          </div>
          <div id="webchat" style={{ width: "100%", height: "100%" }}></div>
        </div>
      )}
    </div>
  );
};

export default App;