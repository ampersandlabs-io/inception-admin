/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SquadPage from "../page";
import { useSquad } from "@/hooks/useSquad";

jest.mock("@/hooks/usePagination", () => ({
  usePagination: () => ({
    page: 1,
    pageSize: 9,
    handlePageChange: jest.fn(),
  }),
}));

jest.mock("@/hooks/useSquad");

jest.mock("@/sections/squad/create-company-modal", () => ({
  CreateSquadModal: () => <div data-testid="create-squad-modal" />,
}));

jest.mock("@/components/empty-state", () => ({
  EmptyState: ({ title }: { title: string }) => <div>{title}</div>,
}));

jest.mock("@/components/projects/cards/squad-card", () => ({
  SquadCard: ({ developer }: { developer: any }) => (
    <div data-testid="squad-card">{developer.name}</div>
  ),
}));

jest.mock("@/contexts/snackbar-context", () => ({
  useSnackbar: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
  }),
}));

const mockUseSquad = useSquad as jest.Mock;

describe("SquadPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loader while fetching squads", () => {
    mockUseSquad.mockReturnValue({
      squads: [],
      loading: true,
      totalItems: 0,
      approveSquad: jest.fn(),
      rejectSquad: jest.fn(),
    });

    const { container } = render(<SquadPage />);

    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders squad list when data exists", () => {
    mockUseSquad.mockReturnValue({
      squads: [
        { id: "1", name: "Dev One" },
        { id: "2", name: "Dev Two" },
      ],
      loading: false,
      totalItems: 2,
      approveSquad: jest.fn(),
      rejectSquad: jest.fn(),
    });

    render(<SquadPage />);

    expect(screen.getByText("Dev One")).toBeInTheDocument();
    expect(screen.getByText("Dev Two")).toBeInTheDocument();
  });

  it("renders EmptyState when no squads exist", () => {
    mockUseSquad.mockReturnValue({
      squads: [],
      loading: false,
      totalItems: 0,
      approveSquad: jest.fn(),
      rejectSquad: jest.fn(),
    });

    render(<SquadPage />);

    expect(screen.getByText("You have no squads")).toBeInTheDocument();
  });
});

