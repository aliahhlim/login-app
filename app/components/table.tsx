//Create a Table Data with columns
//(No., Company Name, Company ID, Description, Created Date) to list down all of the application submitted by the user.

"use client";
import React, { useEffect, useState } from "react";
import { Button, Table, theme } from "antd";
import { TableProps } from "antd";
import Link from "next/link";

interface User {
  num: number;
  name: string;
  companyId: number;
  description: string;
  date: number;
}

const CompanyTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store users data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    // Fetching user data
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const usersData: User[] = await res.json();
      setUsers(usersData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleClick = () => {
    console.log("Clicked");
  };

  // Table columns
  const columns: TableProps<User>["columns"] = [
    {
      title: "No.",
      dataIndex: "id",
      key: "num",
      //render: (num) => <a>{num}</a>, // Makes the ID clickable
    },
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <a>{name}</a>,
    },
    {
      title: "Company ID",
      dataIndex: "companyId",
      key: "CompanyId",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Created Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <>
      <div>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginLeft: "520px",
            marginTop: "10px",
          }}
        >
          Application submitted
        </h1>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Table
          columns={columns} // Columns definition
          dataSource={users} // Data source (fetched users)
          rowKey="companyId" // Unique key for each row (must have!)
          loading={loading} // Show loading indicator until data is fetched
          style={{
            backgroundColor: "lightblue",
          }} // Table background color
        />
      </div>
      <Button
        type="primary"
        style={{ marginTop: "20px", marginLeft: "550px", padding: "15px" }}
        onClick={handleClick}
        href="/users/homepage/form"
      >
        New Application Form
      </Button>
    </>
  );
};

export default CompanyTable;
