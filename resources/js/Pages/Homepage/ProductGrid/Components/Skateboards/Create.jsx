import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateSkateboard() {
    const { data, setData, post, errors } = useForm({
        name: '',
        image: null,
        price: '',
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        // Générer un aperçu de l’image sélectionnée
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/create'); // Envoie la requête POST
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ajouter un Skateboard</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block font-semibold">Nom :</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Image :</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border p-2 w-full rounded"
                        required
                    />
                    {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
                    {errors.image && <p className="text-red-500">{errors.image}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Prix :</label>
                    <input
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                    {errors.price && <p className="text-red-500">{errors.price}</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Ajouter
                </button>
            </form>
        </div>
    );
}
