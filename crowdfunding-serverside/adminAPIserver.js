document.addEventListener('DOMContentLoaded', () => {
    // API URLs
    const API_URL = 'http://localhost:2014/api/fundraisers';

    // Display fundraisers
    const fetchFundraisers = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(fundraisers => {
                const listContainer = document.getElementById('fundraiser-list-container');
                listContainer.innerHTML = '';
                fundraisers.forEach(fundraiser => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${fundraiser.ORGANIZER}</strong> - ${fundraiser.CITY} 
                        (Target: ${fundraiser.TARGET_FUNDING}, Current: ${fundraiser.CURRENT_FUNDING}) 
                        <button onclick="deleteFundraiser(${fundraiser.FUNDRAISER_ID})">Delete</button>
                    `;
                    listContainer.appendChild(li);
                });
            });
    };

    // Create a new fundraiser
    const createForm = document.getElementById('create-fundraiser-form');
    createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newFundraiser = {
            ORGANIZER: document.getElementById('organizer').value,
            CAPTION: document.getElementById('caption').value,
            TARGET_FUNDING: document.getElementById('target_funding').value,
            CITY: document.getElementById('city').value,
            CATEGORY_ID: document.getElementById('category_id').value
        };

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFundraiser)
        })
        .then(response => response.json())
        .then(() => {
            alert('Fundraiser created successfully!');
            fetchFundraisers();
            createForm.reset();
        });
    });

    // Update a fundraiser
    const updateForm = document.getElementById('update-fundraiser-form');
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fundraiserId = document.getElementById('update-fundraiser-id').value;
        const updatedFundraiser = {
            ORGANIZER: document.getElementById('update-organizer').value,
            CAPTION: document.getElementById('update-caption').value,
            TARGET_FUNDING: document.getElementById('update-target_funding').value,
            CITY: document.getElementById('update-city').value
        };

        fetch(`${API_URL}/${fundraiserId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFundraiser)
        })
        .then(response => response.json())
        .then(() => {
            alert('Fundraiser updated successfully!');
            fetchFundraisers();
            updateForm.reset();
        });
    });

    // Delete a fundraiser
    window.deleteFundraiser = (id) => {
        if (confirm('Are you sure you want to delete this fundraiser?')) {
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                alert('Fundraiser deleted!');
                fetchFundraisers();
            });
        }
    };

    // Fetch donations for a fundraiser
    const fetchDonations = (fundraiserId) => {
        fetch(`${API_URL}/${fundraiserId}/donations`)
            .then(response => response.json())
            .then(donations => {
                const donationsList = document.getElementById('donations-list');
                donationsList.innerHTML = '';
                donations.forEach(donation => {
                    const li = document.createElement('li');
                    li.innerText = `${donation.GIVER}: ${donation.AMOUNT} on ${donation.DATE}`;
                    donationsList.appendChild(li);
                });
            });
    };

    // Initialize
    fetchFundraisers();
});