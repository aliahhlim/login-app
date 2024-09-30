// Make sure this is the very first line in the file
"use client";
import type { FormProps } from "antd";
import { Form, Input, Button, Divider, message } from "antd";
import { Image } from "antd";
import Link from "next/link";
import Carousell from "./components/carousellApp";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
};

export default function Signup() {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Form values:", values);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        message.success(result.message);
        router.push("/users");
      } else {
        message.error(result.message);
      }
      console.log("Response:", result);
    } catch (error) {
      console.error("Error occurred:", error);
      message.error("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <main //yg belakang skali
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
          <div // form punya div
            style={{ marginRight: "auto" }}
          >
            <Form
              layout="vertical"
              style={{
                width: "100%",
                marginRight: "150px",
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
                    color: "black",
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

              {/* Name Field */}
              <Form.Item
                label="Name"
                name="name"
                //required
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input your name!" }, // Validation rule
                ]}
              >
                <Input
                  placeholder="Enter your name"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </Form.Item>

              {/* Email Field */}
              <Form.Item
                label="Email"
                name="email"
                //required
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
                //required
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
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    width: "100%",
                    //padding: "10px 15px",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                >
                  Create Account
                </Button>
              </Form.Item>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Already have an account?{" "}
                <Link href="/users" className="font-semibold text-black">
                  Login here
                </Link>
              </div>
            </Form>
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
