import { OptionInterface } from '~/interfaces';

export interface DropdownSelectProps {
  onChange: (selectedOption: OptionInterface | null) => void;
}
