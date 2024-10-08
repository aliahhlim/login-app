"use client";
import { useParams } from "next/navigation";
import ViewForm from "@/app/components/viewTable";

const CompanyForm = () => {
  const { companyId } = useParams(); // Extract companyId from the dynamic route

  return (
    <div>
      <h1>Company ID: {companyId}</h1>
      {/* Pass companyId as a prop to ViewForm */}
      <ViewForm companyId={companyId} />
    </div>
  );
};

export default CompanyForm;
