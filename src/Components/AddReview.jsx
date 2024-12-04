import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const AddReview = () => {
    const { user } = useContext(AuthContext)
    const handleAddReview = event => {
        event.preventDefault();
        const form = event.target;
        const gameCover = form.gameCover.value;
        const gameTitle = form.gameTitle.value;
        const publishingYear = form.publishingYear.value;
        const rating = form.rating.value;
        const genre = form.genre.value;
        const email = form.email.value;
        const reviewDescription = form.reviewDescription.value;
        const name = form.name.value;
        const newReview = { gameCover, gameTitle, publishingYear, rating, genre, email, reviewDescription, name }
        console.log(newReview)
        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newReview)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: "success!",
                        text: ' Review Added successfully',
                        icon: 'success',
                        confirmButtonText: 'cool'
                    })
                }
            })
    }
    return (
        <div className='bg-[#F4F3F0] p-24 '>
            <h1 className='text-3xl font-extrabold'>Add New Review</h1>
            <form onSubmit={handleAddReview}>
                <div className='md:flex '>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Game Cover Image (URL)</span>
                        </label>
                        <label className="input-group">
                            <input type="url" name='gameCover' placeholder="Enter the URL for the game cover" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Game Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name='gameTitle' placeholder="Enter the game title" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                <div className='md:flex '>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Publishing Year</span>
                        </label>
                        <label className="input-group">
                            <input type="number" name='publishingYear' placeholder="e.g., 2024" className="input input-bordered w-full" min="1900" max="2024" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Rating (1-10)</span>
                        </label>
                        <label className="input-group">
                            <input type="number" name='rating' placeholder="Enter a rating (1-10)" className="input input-bordered w-full" min="1" max="10" required />
                        </label>
                    </div>
                </div>
                <div className='md:flex '>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Genre</span>
                        </label>
                        <label className="input-group">
                            <select name='genre' className="input input-bordered w-full" required>
                                <option value="">Select a genre</option>
                                <option value="Action">Action</option>
                                <option value="RPG">RPG</option>
                                <option value="Adventure">Adventure</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">User Email</span>
                        </label>
                        <label className="input-group">
                            <input type="email" name='email' value={user ? user.email : 'null'} className="input input-bordered w-full" readOnly />
                        </label>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Review Description</span>
                    </label>
                    <label className="input-group">
                        <textarea name='reviewDescription' placeholder="Write a detailed review" className="input input-bordered w-full" rows="5" required></textarea>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">User Name</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name='name' value={user ? user.displayName : 'null'} className="input input-bordered w-full" readOnly />
                    </label>
                </div>
                <input type="submit" value="Submit Review" className='btn btn-block bg-gray-500' />
            </form>
        </div>

    );
};

export default AddReview;