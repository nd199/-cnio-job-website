import { Typewriter } from 'react-simple-typewriter';
export default function TypeWriter({ values }) {
  return (
    <h1 className="text-2xl font-bold text-white">
      <Typewriter
        words={Array.isArray(values) ? values : [String(values)]}
        loop={true}
        cursor
        typeSpeed={300}
        deleteSpeed={20}
        delaySpeed={1500}
      />
    </h1>
  );
}
