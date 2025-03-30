import { render, screen, waitFor } from '@testing-library/react';
import LandingPage from './LandingPage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe("Landing Page Tests", () => {
    beforeEach(() => {
        mock.reset();
    });

    // 1. Test if the table renders correctly
    test("Renders table headers", async () => {
        render(<LandingPage />);
        expect(screen.getByText(/Item List/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Filter by name")).toBeInTheDocument();
    });

    // 2. Test if API fetches data successfully
    test("Fetch and display items", async () => {
        mock.onGet("http://localhost:8000/api/items/").reply(200, [
            { id: 1, name: "Laptop", category: "Electronics", price: 1200.00 },
            { id: 2, name: "Phone", category: "Electronics", price: 800.00 }
        ]);

        render(<LandingPage />);
        await waitFor(() => {
            expect(screen.getByText("Laptop")).toBeInTheDocument();
            expect(screen.getByText("Phone")).toBeInTheDocument();
        });
    });

    // 3. Test filtering functionality
    test("Filters results based on user input", async () => {
        mock.onGet("http://localhost:8000/api/items/?search=Lap").reply(200, [
            { id: 1, name: "Laptop", category: "Electronics", price: 1200.00 }
        ]);

        render(<LandingPage />);
        screen.getByPlaceholderText("Filter by name").value = "Lap";
        await waitFor(() => {
            expect(screen.getByText("Laptop")).toBeInTheDocument();
            expect(screen.queryByText("Phone")).not.toBeInTheDocument();
        });
    });
});
