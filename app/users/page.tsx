// Make sure this is the very first line in the file
"use client";
import type { FormProps } from "antd";
import { Form, Input, Button, Divider, message } from "antd";
import { Image } from "antd";
import Link from "next/link";
import Carousell from "../components/carousellApp";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NextAuth from "next-auth";
import React from "react";
import { setCookie } from "cookies-next";

type FieldType = {
  email?: string;
  password?: string;
};

export default function Signin() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: FieldType) => {
    setIsLoading(true);
    console.log("Attempting login...");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        console.error("Login failed:", result.error);
        // Handle error (e.g., show error message to user)
      } else {
        console.log("Login successful, waiting for session...");

        // Wait for the session to update
        //await update();
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle this error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check session status
    if (status === "authenticated" && session) {
      console.log("Session established:", session);
      router.push("/homepage");
    } //else {
    //   message.error("Establishing session, please login again.");
    //   console.error("Session not established after login");
    //   // Handle this error (e.g., show error message to user)
    // }
  }, [session, status]);

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <main
        style={{
          display: "flex", //alignment
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", //to center content
          backgroundColor: "#f0f2f5",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            borderRadius: "30px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Shadow
            padding: "40px",
            width: "80%", // Adjust container width as needed
            maxWidth: "1000px", // Maximum width for responsiveness
          }}
        >
          <div>
            <div // form punya div
              style={{
                marginRight: "auto",
              }}
            >
              <Form
                layout="vertical"
                style={{
                  width: "100%",
                  marginRight: "100px",
                  marginLeft: "30px",
                }} // Full width for the form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <div style={{ marginBottom: "20px" }}>
                  <h1
                    className="font-medium text-lg"
                    style={{
                      textAlign: "left",
                      fontSize: "18px",
                    }}
                  >
                    Basement
                  </h1>
                </div>

                <div style={{ marginBottom: "20px", textAlign: "left" }}>
                  <h2
                    style={{
                      fontSize: "35px",
                      color: "#333",
                    }}
                  >
                    Keep your online business organized
                  </h2>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    textAlign: "left",
                    marginBottom: "30px",
                  }}
                >
                  Sign up to start your 30 days free trial
                </div>

                {/* Sign in Google Button */}
                <Form.Item>
                  <Button
                    htmlType="submit"
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      width: "100%",
                      borderColor: "#d9d9d9",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                      alt="Google Icon"
                      width={20}
                      height={20}
                      style={{ marginRight: "10px" }} // Add space between icon and text
                    />
                    Sign in with Google
                  </Button>
                </Form.Item>

                <div
                  style={{
                    marginBottom: "20px",
                    color: "#888",
                    textAlign: "center",
                  }}
                >
                  <Divider plain>or</Divider>
                </div>

                {/* Email Field */}
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  style={{ marginBottom: "20px" }}
                  rules={[
                    { required: true, message: "Please input your email!" }, // Validation rule
                    {
                      type: "email",
                      message: "Please enter valid email address.",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your email"
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      borderColor: "#d9d9d9",
                    }}
                  />
                </Form.Item>

                {/* Password Field */}
                <Form.Item
                  label="Password"
                  name="password"
                  required
                  style={{ marginBottom: "30px" }}
                  rules={[
                    { required: true, message: "Please input your password!" }, // Validation rule
                    {
                      min: 6,
                      message: "Password must be at least 6 characters.",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      borderColor: "#d9d9d9",
                    }}
                  />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                  <Button
                    htmlType="submit"
                    //href="/users/homepage"
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      width: "100%",
                      //padding: "10px 15px",
                      borderRadius: "8px",
                      fontSize: "11px",
                    }}
                  >
                    Log In
                  </Button>
                </Form.Item>

                <div
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  Don't have an account?{" "}
                  <Link href="./" className="font-semibold text-black">
                    Create new account
                  </Link>
                </div>
              </Form>
            </div>
          </div>
          <div
            style={{
              display: "flex", // Flexbox for carousel
              alignItems: "center", // Center vertically
              justifyContent: "center", // Center horizontally
              marginLeft: "80px",
              //maxWidth: "100%",
              background: "conic-gradient(#c3e3ff, pink, #d09ef5, #c3e3ff)",
              borderRadius: "10px",
            }}
          >
            <Carousell />
          </div>
        </div>
      </main>
    </>
  );
}
