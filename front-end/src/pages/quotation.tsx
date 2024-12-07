import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import CancelIcon from "@mui/icons-material/Cancel";

interface CostDetail {
  costHead: string;
  particulars: string | null;
  securityGuardSemiSkilled: number | null;
  securitySupervisorSkilled: number | null;
}

interface CompanyHours {
  title: string;
  costDetails: CostDetail[];
}

interface QuotationProps {
  companyDName: string;
  companyHours: CompanyHours;
  note: string[];
}

export default function Quotation() {
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [quotationData, setQuotationData] = useState<QuotationProps | null>(
    null
  );
  const printRef = useRef<HTMLDivElement>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPDFPreview, setShowPDFPreview] = useState<boolean>(false);

  const closeModal = () => {
    setPdfUrl(null);
    setShowPDFPreview(false);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6567/api/v1/quotation/pdf"
        );
        setCompanies(Object.keys(response.data));
        console.log(response.data, "companies");
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanySelect = (company: string) => {
    setSelectedCompany(company);
    setSelectedService("");
    setQuotationData(null);
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
  };

  const generatePdf = async () => {
    if (!selectedCompany) return;

    try {
      const servicesToFetch =
        selectedService === "All Services" ? ["8h", "12h"] : [selectedService];
      const fetchedQuotationData: QuotationProps = {
        companyDName: selectedCompany,
        companyHours: { title: "", costDetails: [] },
        note: [],
      };

      for (const service of servicesToFetch) {
        const response = await axios.post(
          "http://localhost:6567/api/v1/quotation/pdf",
          {
            companyName: selectedCompany,
            hours: service,
          }
        );
        console.log("Fetched response for service:", service, response.data);
        const companyData = response.data;
        fetchedQuotationData.companyDName = companyData.companyDName;
        fetchedQuotationData.companyHours = companyData.companyHours;
        fetchedQuotationData.note = response.data.note;
      }

      setQuotationData(fetchedQuotationData);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select Company and Service</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Select Company</h2>
        {companies.map((company) => (
          <button
            key={company}
            onClick={() => handleCompanySelect(company)}
            className={`mx-2 mb-2 p-2 border ${
              selectedCompany === company
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            } rounded`}
          >
            {company}
          </button>
        ))}
      </div>

      {selectedCompany && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Services for {selectedCompany}
          </h2>
          {["All Services", "8h", "12h"].map((service) => (
            <button
              key={service}
              onClick={() => handleServiceSelect(service)}
              className={`mx-2 mb-2 p-2 border ${
                selectedService === service
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300"
              } rounded`}
            >
              {service}
            </button>
          ))}
        </div>
      )}

      {selectedService && (
        <button
          onClick={generatePdf}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Generate PDF
        </button>
      )}

      {quotationData && (
        <div ref={printRef} className="bg-white p-6 rounded shadow-md mt-4 ">
          <h1 className="text-2xl font-bold mb-4">
            {quotationData.companyDName}
          </h1>

          <h2 className="text-xl font-semibold mt-4">Services:</h2>
          <div className="mb-4">
            <h3 className="font-bold">{quotationData.companyHours.title}</h3>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Cost Head</th>
                  <th className="border border-gray-300 p-2">Particulars</th>
                  <th className="border border-gray-300 p-2">
                    Security Guard (Semi-Skilled)
                  </th>
                  <th className="border border-gray-300 p-2">
                    Security Supervisor (Skilled)
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotationData.companyHours.costDetails.map(
                  (detail, indexa) => (
                    <tr key={indexa}>
                      <td className="border border-gray-300 p-2">
                        {detail.costHead}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.particulars || "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.securityGuardSemiSkilled !== null
                          ? detail.securityGuardSemiSkilled
                          : "N/A"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {detail.securitySupervisorSkilled !== null
                          ? detail.securitySupervisorSkilled
                          : "N/A"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <h2 className="text-xl font-semibold mt-4">
            Terms and Conditions: <br /> <br /> GST 18% extra applicable as per
            Govt notification The Billing rate will be revised according to the
            Govt. notification Above quoted rate including statutory
            compliances.
          </h2>
        </div>
      )}
      {showPDFPreview && pdfUrl && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <CancelIcon />
            </button>
            <h2 className="text-lg font-semibold mb-4">PDF Preview</h2>
            <iframe
              src={pdfUrl}
              className="w-full h-[500px]"
              title="PDF Preview"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
