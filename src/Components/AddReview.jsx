import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

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
        fetch('https://chill-gamer-server-jet.vercel.app/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newReview)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "success!",
                        text: ' Review Added successfully',
                        icon: 'success',
                        confirmButtonText: 'cool'
                    })
                    form.reset()
                }
            })
    }
    return (
        <div className='lg:w-9/12 p-4 lg:p-16 mx-auto '>
            <Helmet>
                <title>Add Review | ChillGamers</title>
            </Helmet>
            <h1 className='text-4xl text-center font-extrabold mb-8'>Add New Review</h1>
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
                    <div className="form-control md:w-1/2 lg:ml-4">
                        <label className="label">
                            <span className="label-text">Game Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name='gameTitle' placeholder="Enter the game title" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Review Description</span>
                    </label>
                    <label className="input-group">
                        <textarea
                            name="reviewDescription"
                            placeholder="Write a detailed review"
                            className="textarea textarea-bordered w-full  shadow-sm rounded-lg focus:ring focus:ring-indigo-300"
                            rows="2"
                            required
                        ></textarea>
                    </label>
                </div>

                <div className='md:flex '>
                    <div className="form-control md:w-1/2 ">
                        <label className="label">
                            <span className="label-text">Rating (1-10)</span>
                        </label>
                        <label className="input-group">
                            <input type="number" name='rating' placeholder="Enter a rating (1-10)" className="input input-bordered w-full" min="1" max="10" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 lg:ml-4">
                        <label className="label">
                            <span className="label-text">Publishing Year</span>
                        </label>
                        <label className="input-group">
                            <input type="number" name='publishingYear' placeholder="e.g., 2024" className="input input-bordered w-full" min="1900" max="2024" required />
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
                    <div className="form-control md:w-1/2 lg:ml-4">
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
                        <span className="label-text">User Name</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name='name' value={user ? user.displayName : 'null'} className="input input-bordered w-full" readOnly />
                    </label>
                </div>
                <input type="submit" value="Submit Review" className='btn btn-block mt-4 bg-indigo-600 hover:bg-indigo-700' />
            </form>
        </div>

    );
};

export default AddReview;