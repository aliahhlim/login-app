"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Table, message } from "antd";
import { TableProps } from "antd";
import Link from "next/link";
import dayjs from "dayjs";

interface User {
  num: number;
  name: string;
  companyId: number;
  description: string;
  date: string;
}

const CompanyTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store users data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/application/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const result = await response.json();
          const formattedData = result.map((item: any, index: number) => ({
            num: index + 1,
            name: item.CompanyName,
            companyId: item.CompanyID,
            description: item.Description,
            date: item.CreatedDate
              ? dayjs(item.CreatedDate).format("DD/MM/YYYY")
              : "Date Error", // Formatting the date with dayjs
          }));
          setUsers(formattedData);
        } catch (error) {
          console.error("Error occurred:", error);
          message.error("An error occurred while fetching applications");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userId]);

  // useEffect(() => {
  //   // Fetching user data
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:4000/application/${userId}",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       const result = await response.json();
  //       const formattedData = result.map((item: any, index: number) => ({
  //         num: index + 1,
  //         name: item.CompanyName,
  //         companyId: item.CompanyID,
  //         description: item.Description,
  //         date: new Date(item.CreatedDate).toLocaleDateString(), // Formatting the date
  //       }));
  //       setUsers(formattedData);
  //     } catch (error) {
  //       console.error("Error occurred:", error);
  //       message.error("An error occurred while fetching applications");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleClick = () => {
    console.log("Clicked");
  };

  // Table columns
  const columns: TableProps<User>["columns"] = [
    {
      title: "No.",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      //render: (name) => <a>{name}</a>, // Makes the company name clickable
      render: (name, record) => (
        <Link href={`/homepage/view/${record.companyId}`}>{name}</Link>
      ),
    },
    {
      title: "Company ID",
      dataIndex: "companyId",
      key: "companyId",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
        href="/homepage/form"
      >
        New Application Form
      </Button>
    </>
  );
};

export default CompanyTable;
