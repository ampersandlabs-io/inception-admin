/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SquadCard } from "../squad-card";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/components/ui/dropdown", () => ({
  Dropdown: ({ items }: { items: { label: string; onClick: () => void }[] }) => (
    <div>
      {items.map((item) => (
        <button key={item.label} onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </div>
  ),
}));

const baseDeveloper = {
  id: "dev-1",
  first_name: "Jane",
  last_name: "Doe",
  role_name: "Frontend Engineer",
  email: "jane@example.com",
  vetting_status: "approved",
  years_experience: 5,
  hourly_rate: 75,
  rating: 4.6,
  completed_projects: 12,
  tech_stacks: [{ name: "React" }],
  github_username: "janedoe",
  portfolio_url: "https://example.com",
};

describe("SquadCard", () => {
  it("renders developer info", () => {
    render(
      <SquadCard
        developer={baseDeveloper as any}
        onApprove={jest.fn()}
        onReject={jest.fn()}
      />
    );

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("calls onApprove and onReject from dropdown actions", () => {
    const onApprove = jest.fn();
    const onReject = jest.fn();

    render(
      <SquadCard
        developer={baseDeveloper as any}
        onApprove={onApprove}
        onReject={onReject}
      />
    );

    fireEvent.click(screen.getByText("Approve"));
    fireEvent.click(screen.getByText("Reject"));

    expect(onApprove).toHaveBeenCalledTimes(1);
    expect(onReject).toHaveBeenCalledTimes(1);
  });

  it("navigates to profile on View Profile", () => {
    render(
      <SquadCard
        developer={baseDeveloper as any}
        onApprove={jest.fn()}
        onReject={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("View Profile"));

    expect(mockPush).toHaveBeenCalledWith("squad/dev-1");
  });
});

