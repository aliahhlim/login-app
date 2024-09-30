// Make sure this is the very first line in the file
"use client";
import type { FormProps } from "antd";
import { Form, Input, Button, Divider, message } from "antd"; //import the components in antd
import { Image } from "antd"; // for image importing
import Link from "next/link"; // Importing Link component for navigation
import React from "react";
import { useState } from "react";
/*
Create a form layout with the following fields:- 
Company Name- Company ID - Address Line 1/2/3- Country- State- City- Postcode- Description*/

//for validation purposes
type FieldType = {
  name?: string;
  id?: number;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  postcode?: number;
  description?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

//main

export default function Home({
  name,
  id,
  address,
  country,
  state,
  city,
  postcode,
  description,
}: FieldType) {
  const [loading, setLoading] = useState<boolean>(true);
  /*
  const onFinish: FormProps<FieldType>["onFinish"] = async (
    values: FieldType
  ) => {
    console.log("Form values:", values);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        message.success(result.message);
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
  };*/

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
          //backgroundColor: "#f0f2f5",
          background: "linear-gradient(#c3e3ff, pink, #d09ef5, #c3e3ff)",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            borderRadius: "30px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Shadow
            padding: "10px",
            //width: "80%", // Adjust container width as needed
            maxWidth: "1000px", // Maximum width for responsiveness
          }}
        >
          <div // form punya div
          //style={{ marginRight: "auto" }}
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
              <div style={{ marginBottom: "20px", textAlign: "left" }}>
                <h2
                  style={{
                    fontSize: "35px",
                    color: "black",
                  }}
                >
                  Application Form
                </h2>
              </div>

              {/* Name Field */}
              <Form.Item
                label="Company Name"
                name="name"
                //required
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input company name!" }, // Validation rule
                ]}
              >
                <Input
                  placeholder="Enter company's name"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </Form.Item>

              {/* Email Field */}
              <Form.Item
                label="Company ID"
                name="id"
                //required
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input company's ID" }, // Validation rule
                ]}
              >
                <Input
                  placeholder="Enter company's ID"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                //required
                style={{ marginBottom: "30px" }}
                rules={[
                  { required: true, message: "Please input your address!" }, // Validation rule
                ]}
              >
                <Input
                  placeholder="Address Line 1"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                    marginBottom: "10px",
                  }}
                />
                <Input
                  placeholder="Address Line 2"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                    marginBottom: "10px",
                  }}
                />
                <Input
                  placeholder="Address Line 3"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                //required
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input country!" }, // Validation rule
                ]}
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

              {/*state*/}
              <Form.Item
                label="State"
                name="state"
                //required
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input state!" }, // Validation rule
                ]}
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

              {/*city*/}
              <Form.Item
                label="City"
                name="city"
                //required
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input city!" }, // Validation rule
                ]}
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

              {/*postcode*/}
              <Form.Item
                label="Postcode"
                name="postcode"
                //required
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input postcode!" }, // Validation rule
                ]}
              >
                <Input
                  placeholder="Enter postcode"
                  maxLength={5}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    borderColor: "#d9d9d9",
                  }}
                />
              </Form.Item>

              {/*description*/}
              <Form.Item
                label="Description"
                name="description"
                //required
                style={{ marginBottom: "20px" }}
                rules={[
                  { required: true, message: "Please input description!" }, // Validation rule
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
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    width: "100%",
                    //padding: "10px 15px",
                    borderRadius: "8px",
                    fontSize: "11px",
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
