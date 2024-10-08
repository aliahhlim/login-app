// "use client";
// import React, { useEffect, useState } from "react";
// import { Button, Table, message } from "antd";
// import { TableProps } from "antd";
// import Link from "next/link";

// interface User {
//   name: string;
//   id: number;
//   addressLine1: string;
//   addressLine2: string;
//   addressLine3: string;
//   country: string;
//   state: string;
//   city: string;
//   postcode: number;
//   description: string;
// }

// const ViewForm: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]); // State to store users data
//   const [loading, setLoading] = useState<boolean>(true); // Loading state

//   useEffect(() => {
//     // Fetching user data
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/application`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const result = await response.json();
//         const formattedData = result.map((item: any) => ({
//           name: item.CompanyName,
//           id: item.CompanyID,
//           addressLine1: item.Address1,
//           addressLine2: item.Address2,
//           addressLine3: item.Address3,
//           country: item.Country,
//           state: item.State,
//           city: item.City,
//           postcode: item.Postcode,
//           description: item.Description,
//         }));
//         setUsers(formattedData);
//       } catch (error) {
//         console.error("Error occurred:", error);
//         message.error("An error occurred while fetching applications");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Table columns
//   const columns: TableProps<User>["columns"] = [
//     {
//       title: "Company Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Company ID",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Address Line 1",
//       dataIndex: "addressLine1",
//       key: "addressLine1",
//     },
//     {
//       title: "Address Line 2",
//       dataIndex: "addressLine2",
//       key: "addressLine2",
//     },
//     {
//       title: "Address Line 3",
//       dataIndex: "addressLine3",
//       key: "addressLine3",
//     },
//     {
//       title: "Country",
//       dataIndex: "country",
//       key: "country",
//     },
//     {
//       title: "State",
//       dataIndex: "state",
//       key: "state",
//     },
//     {
//       title: "City",
//       dataIndex: "city",
//       key: "city",
//     },
//     {
//       title: "Postcode",
//       dataIndex: "postcode",
//       key: "postcode",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//   ];

//   return (
//     <>
//       <div style={{ backgroundColor: "lightblue" }}>
//         <h1
//           style={{
//             fontSize: "25px",
//             fontWeight: "bold",
//             marginLeft: "640px",
//             marginTop: "20px",
//           }}
//         >
//           View Application
//         </h1>
//       </div>

//       <div style={{ marginTop: "30px" }}>
//         <Table
//           columns={columns} // Columns definition
//           dataSource={users} // Data source (fetched users)
//           rowKey="id" // Unique key for each row (must have!)
//           loading={loading} // Show loading indicator until data is fetched
//           style={{
//             backgroundColor: "lightblue",
//           }} // Table background color
//         />
//       </div>
//       <Button
//         type="primary"
//         style={{
//           marginTop: "20px",
//           marginLeft: "650px",
//           marginBottom: "20px",
//           padding: "15px",
//         }}
//         href="/homepage"
//       >
//         Back to homepage
//       </Button>
//     </>
//   );
// };

// export default ViewForm;
