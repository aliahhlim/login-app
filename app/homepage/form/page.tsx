"use client";
import type { FormProps } from "antd";
import { Form, Input, Button, Divider, message, Skeleton, Spin } from "antd"; // Importing necessary components
import Link from "next/link"; // Importing Link component for navigation
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// For validation purposes
type FieldType = {
  name?: string;
  id?: number;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  country?: string;
  state?: string;
  city?: string;
  postcode?: number;
  description?: string;
};

export default function FormPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false); // Move loading state here
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") signIn();
  }, [status]);

  if (status === "loading") {
    return (
      <div style={{ marginLeft: "700px", marginTop: "400px" }}>
        <Spin size="large" />
      </div>
    );
  }

  const onFinish = async (values: any) => {
    if (!session) {
      message.error("You need to be logged in to submit an application");
      return;
    }

    const userId = session?.user?.id;

    const applicationData = {
      ...values,
      userId,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:4000/application`,
        applicationData
      );

      console.log("Response received:", response); // Log the response for debugging

      if (response.status === 201) {
        message.success("Application submitted successfully");
        console.log("Redirecting to homepage..."); // Log before redirect
        router.push("/homepage");
      }
      // if (response.status === 400) {
      //   message.error("Duplicate application entry denied.");
      // }
    } catch (error) {
      console.error("Error submitting application:", error);
      message.error("An error occurred while submitting the application"); // Generic error message
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
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "lightblue",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            borderRadius: "30px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
            padding: "30px",
            width: "80%",
            maxWidth: "500px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Form
              layout="vertical"
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Button
                style={{
                  marginTop: "0px",
                  color: "#fff",
                  backgroundColor: "#000",
                }}
                href="/homepage"
              >
                Back to Home Page
              </Button>
              <div style={{ marginBottom: "20px", textAlign: "left" }}>
                <h2
                  style={{
                    fontSize: "35px",
                    color: "black",
                    marginTop: "10px",
                  }}
                >
                  Application Form
                </h2>
              </div>

              {/* Name Field */}
              <Form.Item
                label="Company Name"
                name="name"
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input company name!" },
                ]}
              >
                <Input
                  placeholder="Enter company's name"
                  style={{
                    padding: "10px",
                    width: "400px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </Form.Item>

              {/* Company ID Field */}
              <Form.Item
                label="Company ID"
                name="id"
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input company's ID" },
                ]}
              >
                <Input
                  placeholder="Enter company's ID"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                    width: "400px",
                  }}
                />
              </Form.Item>

              {/* Address Fields */}
              <Form.Item label="Address" required>
                <Form.Item
                  name="addressLine1"
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: "Please input address line 1!" },
                  ]}
                >
                  <Input placeholder="Address Line 1" />
                </Form.Item>
                <Form.Item
                  name="addressLine2"
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: "Please input address line 2!" },
                  ]}
                >
                  <Input placeholder="Address Line 2" />
                </Form.Item>
                <Form.Item name="addressLine3" style={{ marginBottom: 0 }}>
                  <Input placeholder="Address Line 3 (Optional)" />
                </Form.Item>
              </Form.Item>

              {/* Country Field */}
              <Form.Item
                label="Country"
                name="country"
                style={{ marginBottom: "20px" }}
                rules={[{ required: true, message: "Please input country!" }]}
              >
                <Input
                  placeholder="Enter country"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </Form.Item>

              {/* State Field */}
              <Form.Item
                label="State"
                name="state"
                style={{ marginBottom: "20px" }}
                rules={[{ required: true, message: "Please input state!" }]}
              >
                <Input
                  placeholder="Enter State"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </Form.Item>

              {/* City Field */}
              <Form.Item
                label="City"
                name="city"
                style={{ marginBottom: "20px" }}
                rules={[{ required: true, message: "Please input city!" }]}
              >
                <Input
                  placeholder="Enter city"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </Form.Item>

              {/* Postcode Field */}
              <Form.Item
                label="Postcode"
                name="postcode"
                style={{ marginBottom: "20px" }}
                rules={[{ required: true, message: "Please input postcode!" }]}
              >
                <Input
                  placeholder="Enter postcode"
                  maxLength={5}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                    width: "400px",
                  }}
                />
              </Form.Item>

              {/* Description Field */}
              <Form.Item
                label="Description"
                name="description"
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input description!" },
                ]}
              >
                <Input
                  placeholder="Enter description here"
                  maxLength={100}
                  showCount
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                    height: 50,
                    resize: "none",
                  }}
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={loading} // Add loading state to button
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  Apply
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
}
