"use client";
import type { FormProps } from "antd";
import { Form, Input, Button, Divider, message, Skeleton } from "antd"; // Importing necessary components
import Link from "next/link"; // Importing Link component for navigation
import React from "react";
import { useState } from "react";
import axios from "axios";

/*
Create a form layout with the following fields:- 
Company Name- Company ID - Address Line 1/2/3- Country- State- City- Postcode- Description
*/

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
  <Skeleton active />;
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Form values:", values);
    setLoading(true); // Start loading state

    try {
      const response = await axios.post(
        "http://localhost:4000/application",
        values
      );

      if (response.status === 201) {
        message.success("Application submitted successfully!");
      } else {
        message.error("Failed to submit application.");
      }
      console.log("Response:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          // Assuming 409 Conflict for duplicate Company ID
          message.error(
            "Company ID already exists. Please use a different ID."
          );
        } else {
          message.error(
            "Failed to submit application: " + error.response.data.message
          );
        }
      } else {
        console.error("Error occurred:", error);
        message.error("An error occurred during submission.");
      }
    } finally {
      setLoading(false); // End loading state
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
                  Apply Now
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
}
