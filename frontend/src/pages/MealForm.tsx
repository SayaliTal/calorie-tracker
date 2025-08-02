import React from 'react';
import Button from '../ui/Button';

interface IMealFormProps {
  description: string;
  calories: number;
  onDescriptionChange: (desc: string) => void;
  onCaloriesChange: (cal: number) => void;
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  analyzing?: boolean;
  showImageInput?: boolean;
  submitLabel?: string;
}

const MealForm: React.FC<IMealFormProps> = ({
  description,
  calories,
  onDescriptionChange,
  onCaloriesChange,
  onImageChange,
  onSubmit,
  loading,
  analyzing,
  showImageInput = false,
  submitLabel = 'Save',
}) => {
  const randomFoods = [
    { name: 'Grilled Chicken Breast', calories: 165 },
    { name: 'Salmon Fillet', calories: 208 },
    { name: 'Quinoa Bowl', calories: 120 },
    { name: 'Greek Yogurt', calories: 59 },
    { name: 'Avocado Toast', calories: 220 },
    { name: 'Spinach Salad', calories: 23 },
    { name: 'Sweet Potato', calories: 103 },
    { name: 'Almonds', calories: 164 },
    { name: 'Blueberries', calories: 57 },
    { name: 'Oatmeal', calories: 68 },
    { name: 'Tuna Sandwich', calories: 350 },
    { name: 'Broccoli', calories: 55 },
    { name: 'Banana', calories: 105 },
    { name: 'Eggs', calories: 155 },
    { name: 'Brown Rice', calories: 216 },
  ];

  const suggestRandomFood = () => {
    const randomFood =
      randomFoods[Math.floor(Math.random() * randomFoods.length)];
    onDescriptionChange(randomFood.name);
    onCaloriesChange(randomFood.calories);
  };

  return (
    <form onSubmit={onSubmit} className='stats-form'>
      <input
        required
        placeholder='Description'
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className='stats-input'
        disabled={!!analyzing}
      />
      <input
        required
        type='number'
        placeholder='Calories'
        value={calories === 0 ? '' : calories}
        onChange={(e) =>
          onCaloriesChange(
            e.target.value === '' ? 0 : Math.max(0, Number(e.target.value))
          )
        }
        className='stats-input'
        disabled={!!analyzing}
      />
      <Button
        type='button'
        onClick={suggestRandomFood}
        disabled={!!analyzing}
        className='stats-submit-btn'
        style={{ backgroundColor: '#6c5ce7', marginBottom: '10px' }}
      >
        🎲 Random Food Suggestion
      </Button>
      {showImageInput && (
        <>
          <label className='upload-file-label'>
            Upload Image
            <input
              type='file'
              accept='image/*'
              onChange={onImageChange}
              className='upload-file-input'
              disabled={!!analyzing}
            />
          </label>
        </>
      )}
      <Button
        type='submit'
        disabled={!!loading || !!analyzing}
        className='stats-submit-btn'
      >
        {analyzing ? 'Detecting...' : submitLabel}
      </Button>
    </form>
  );
};

export default MealForm;
