/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import CompaniesPage from "../page";
import { fetchCompanies } from "@/services/companyService";
import { beforeEach, describe } from "node:test";

// Mock external services and components
jest.mock("@/services/companyService");
jest.mock("@/sections/companies/create-company-modal", () => ({
  CreateCompanyModal: () => <div data-testid="create-company-modal" />,
}));
jest.mock("@/components/empty-state", () => ({
  EmptyState: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe("CompaniesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loader while fetching companies", async () => {
    (fetchCompanies as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // never resolves
    );

    render(<CompaniesPage />);
    expect(screen.getByRole("status")).toBeInTheDocument(); // Loader2 icon role
  });

  it("renders company list when companies exist", async () => {
    (fetchCompanies as jest.Mock).mockResolvedValueOnce({
      companies: [
        { id: "1", name: "Ampersand", business_type: "Tech", size: "Small" },
        { id: "2", name: "Inception", business_type: "Finance", size: "Medium" },
      ],
    });

    render(<CompaniesPage />);

    await waitFor(() =>
      expect(screen.getByText("Ampersand")).toBeInTheDocument()
    );
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders EmptyState when no companies exist", async () => {
    (fetchCompanies as jest.Mock).mockResolvedValueOnce({ companies: [] });

    render(<CompaniesPage />);

    await waitFor(() =>
      expect(screen.getByText("You have no companies")).toBeInTheDocument()
    );
  });
});