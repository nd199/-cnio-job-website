const Button = ({ children, onClick, variant = 'default', className = '' }) => {
  const baseStyle = 'px-6 py-3 text-lg font-semibold rounded-xl transition duration-300';
  const variants = {
    default: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90',
    outline:
      'border border-zinc-500 text-zinc-300 hover:text-white hover:border-white bg-transparent',
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
