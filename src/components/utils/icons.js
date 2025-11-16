// components/icons.js
import {
  Pencil,
  Check,
  X,
  Plus,
  Trash2,
} from 'lucide-react';

// Base style shared across icons
const baseIconStyle = 'cursor-pointer transition-colors duration-200';

// Specific variants
export const EditIcon = (props) => (
  <Pencil size={16} className={`text-white hover:text-gray-300 ${baseIconStyle}`} {...props} />
);

export const SaveIcon = (props) => (
  <Check size={16} className={`text-green-400 hover:text-green-300 ${baseIconStyle}`} {...props} />
);

export const CancelIcon = (props) => (
  <X size={16} className={`text-red-400 hover:text-red-300 ${baseIconStyle}`} {...props} />
);

export const AddIcon = (props) => (
  <Plus size={16} className={`text-white hover:text-gray-300 ${baseIconStyle}`} {...props} />
);

export const DeleteIcon = (props) => (
  <Trash2 size={16} className={`text-white hover:text-gray-300 ${baseIconStyle}`} {...props} />
);
