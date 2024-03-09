import { useState } from 'react';
import { z } from 'zod';


const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email({ message: 'Email must be a valid email' }),
  url: z.string().url({ message: 'URL must be a valid url' }),
  message: z.string().min(1, 'message is required'),
});


type FormData = z.infer<typeof schema>;

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    url : ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    setErrors({});
    
    const result = schema.safeParse(formData);
    
    console.log(result , 'resultresult')
    
    if (result.success) {
      
      console.log(result.data);

    } else {

      setErrors(result.error.formErrors.fieldErrors);
    
    } };

  return (
    <form onSubmit={handleSubmit}>
    
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      {errors.name && <p>{errors.name}</p>}
    
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      {errors.email && <p>{errors.email}</p>}

      <input type="url" name="url" value={formData.url} onChange={handleChange} placeholder="url" />
      {errors.url && <p>{errors.url}</p>}

      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" />
      {errors.message && <p>{errors.message}</p>}

      <button type="submit">Submit</button>
    
    </form>
  );
}

export default App;
