import { FC } from "react";

interface props {
  label: string;
  inputName: string;
  placeHolder: string;
}

const InputWithLabel: FC<props> = ({ label, inputName, placeHolder }) => {
  return (
    <div className="flex flex-col gap-0.5 ">
      <label htmlFor={label} className="w-full text-foreground/70 px-2">
        {label}
      </label>
      <input
        name={inputName}
        type="text"
        placeholder={placeHolder}
        className="w-full rounded-lg px-4 py-3 dark:bg-mygray bg-mygray/20"
      />
    </div>
  );
};

export default InputWithLabel;
