import { useState } from 'react';

export default function BinaryVsPairwiseSearch() {
  // 입력값
  const [normalValue, setNormalValue] = useState(10);
  const [oddValue, setOddValue] = useState(5);
  const [oddIndex, setOddIndex] = useState(7);

  // 시작 후 적용되는 값
  const [started, setStarted] = useState(false);
  const [appliedData, setAppliedData] = useState([]);

  // 단계 진행
  const [algo1Step, setAlgo1Step] = useState(0);
  const [algo2Step, setAlgo2Step] = useState(0);

  // 시작 버튼
  const handleStart = () => {
    const arr = Array(10).fill(Number(normalValue));
    arr[oddIndex - 1] = Number(oddValue);

    setAppliedData(arr);

    setAlgo1Step(0);
    setAlgo2Step(0);

    setStarted(true);
  };

  // 알고리즘1 (2개씩 비교)
  const createAlgorithm1Steps = () => {
    const steps = [];

    for (let i = 0; i < appliedData.length; i += 2) {
      const left = appliedData[i];
      const right = appliedData[i + 1];

      // 마지막 홀수 처리
      if (right === undefined) {
        steps.push({
          title: `${steps.length + 1}단계`,
          compare: [i],
          message: `${i + 1}번 확인`,
          result: `${i + 1}번 값이 다르므로 탐색 종료!`,
          found: i,
        });

        break;
      }

      // 값 다르면 종료
      if (left !== right) {
        const foundIndex = left < right ? i : i + 1;

        steps.push({
          title: `${steps.length + 1}단계`,
          compare: [i, i + 1],
          message: `${i + 1}번과 ${i + 2}번 비교`,
          result: `${foundIndex + 1}번 값이 다르므로 탐색 종료!`,
          found: foundIndex,
        });

        break;
      }

      // 같으면 계속
      steps.push({
        title: `${steps.length + 1}단계`,
        compare: [i, i + 1],
        message: `${i + 1}번과 ${i + 2}번 비교`,
        result: `값이 같으므로 다음 탐색 진행`,
      });
    }

    return steps;
  };

  // 알고리즘2 (이진탐색)
  const createAlgorithm2Steps = () => {
    const steps = [];

    let low = 1;
    let high = 10;

    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      const middleIndex = middle - 1;

      const middleValue = appliedData[middleIndex];

      // 찾음
      if (middleValue === Number(oddValue)) {
        steps.push({
          title: `${steps.length + 1}단계`,
          formula: `low = ${low}, high = ${high}, middle = (${low}+${high}) / 2 = ${middle}`,
          compare: [middleIndex],
          message: `${middle}번 값 확인`,
          result: `${middle}번에서 다른 값 발견! 탐색 종료!`,
          found: middleIndex,
        });

        break;
      }

      // 목표 위치 기준 이동
      if (middleIndex < oddIndex - 1) {
        steps.push({
          title: `${steps.length + 1}단계`,
          formula: `low = ${low}, high = ${high}, middle = (${low}+${high}) / 2 = ${middle}`,
          compare: [middleIndex],
          message: `${middle}번 값 확인`,
          result: `다른 값이 오른쪽에 있으므로 오른쪽 탐색`,
        });

        low = middle + 1;
      } else {
        steps.push({
          title: `${steps.length + 1}단계`,
          formula: `low = ${low}, high = ${high}, middle = (${low}+${high}) / 2 = ${middle}`,
          compare: [middleIndex],
          message: `${middle}번 값 확인`,
          result: `다른 값이 왼쪽에 있으므로 왼쪽 탐색`,
        });

        high = middle - 1;
      }
    }

    return steps;
  };

  const algo1Steps = started ? createAlgorithm1Steps() : [];
  const algo2Steps = started ? createAlgorithm2Steps() : [];

  // 박스 렌더링
  const renderBoxes = (step) => {
    return appliedData.map((value, index) => {
      const isCompare = step.compare.includes(index);
      const isFound = step.found === index;

      return (
        <div
          key={index}
          className={`
            w-16 h-16 rounded-2xl border-2
            flex flex-col items-center justify-center
            font-bold shadow-md transition-all
            ${
              isFound
                ? 'bg-green-500 text-white border-green-700 scale-110'
                : isCompare
                ? 'bg-blue-500 text-white border-blue-700'
                : 'bg-white border-slate-300'
            }
          `}
        >
          <div className="text-xs">{index + 1}</div>
          <div className="text-xl">{value}</div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* 상단 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            알고리즘1 vs 알고리즘2 비교
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div>
              <label className="block font-bold mb-2">
                기본 값
              </label>

              <input
                type="number"
                value={normalValue}
                onChange={(e) => setNormalValue(e.target.value)}
                className="w-full border-2 border-slate-300 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">
                다른 값
              </label>

              <input
                type="number"
                value={oddValue}
                onChange={(e) => setOddValue(e.target.value)}
                className="w-full border-2 border-slate-300 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">
                다른 값 위치
              </label>

              <input
                type="number"
                min="1"
                max="10"
                value={oddIndex}
                onChange={(e) => setOddIndex(Number(e.target.value))}
                className="w-full border-2 border-slate-300 rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleStart}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-4 py-3"
              >
                시작!
              </button>
            </div>

          </div>
        </div>

        {/* 본문 */}
        {started && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* 알고리즘1 */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-orange-200">

                <h2 className="text-3xl font-bold text-orange-600 mb-6">
                  알고리즘1
                </h2>

                <div className="bg-slate-50 rounded-2xl p-6 border">

                  <h3 className="text-2xl font-bold mb-4">
                    {algo1Steps[algo1Step]?.title}
                  </h3>

                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {renderBoxes(algo1Steps[algo1Step])}
                  </div>

                  <div className="text-center space-y-2">
                    <div className="text-lg font-semibold">
                      {algo1Steps[algo1Step]?.message}
                    </div>

                    <div className="text-lg font-bold text-orange-600">
                      {algo1Steps[algo1Step]?.result}
                    </div>
                  </div>

                </div>

                <div className="flex justify-center gap-4 mt-6">

                  <button
                    onClick={() =>
                      setAlgo1Step((prev) => Math.max(prev - 1, 0))
                    }
                    className="px-6 py-3 rounded-xl bg-slate-200 font-bold"
                  >
                    이전 단계
                  </button>

                  <button
                    onClick={() =>
                      setAlgo1Step((prev) =>
                        Math.min(prev + 1, algo1Steps.length - 1)
                      )
                    }
                    className="px-6 py-3 rounded-xl bg-orange-500 text-white font-bold"
                  >
                    다음 단계
                  </button>

                </div>

              </div>

              {/* 알고리즘2 */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-200">

                <h2 className="text-3xl font-bold text-blue-700 mb-6">
                  알고리즘2
                </h2>

                <div className="bg-slate-50 rounded-2xl p-6 border">

                  <h3 className="text-2xl font-bold mb-4">
                    {algo2Steps[algo2Step]?.title}
                  </h3>

                  <div className="bg-slate-900 text-green-400 rounded-2xl p-4 mb-5 font-mono">
                    {algo2Steps[algo2Step]?.formula}
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {renderBoxes(algo2Steps[algo2Step])}
                  </div>

                  <div className="text-center space-y-2">
                    <div className="text-lg font-semibold">
                      {algo2Steps[algo2Step]?.message}
                    </div>

                    <div className="text-lg font-bold text-blue-700">
                      {algo2Steps[algo2Step]?.result}
                    </div>
                  </div>

                </div>

                <div className="flex justify-center gap-4 mt-6">

                  <button
                    onClick={() =>
                      setAlgo2Step((prev) => Math.max(prev - 1, 0))
                    }
                    className="px-6 py-3 rounded-xl bg-slate-200 font-bold"
                  >
                    이전 단계
                  </button>

                  <button
                    onClick={() =>
                      setAlgo2Step((prev) =>
                        Math.min(prev + 1, algo2Steps.length - 1)
                      )
                    }
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold"
                  >
                    다음 단계
                  </button>

                </div>

              </div>

            </div>

            {/* 최종 결과 */}
            <div className="mt-10 bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-3xl font-bold text-center mb-8">
                최종 결과
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200 text-center">
                  <h3 className="text-2xl font-bold text-orange-600 mb-4">
                    알고리즘1 결과
                  </h3>

                  <div className="text-4xl font-bold text-orange-700 mb-3">
                    {oddIndex}번 발견
                  </div>

                  <div className="text-lg">
                    총 {algo1Steps.length}번 비교
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 text-center">
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">
                    알고리즘2 결과
                  </h3>

                  <div className="text-4xl font-bold text-blue-700 mb-3">
                    {oddIndex}번 발견
                  </div>

                  <div className="text-lg">
                    총 {algo2Steps.length}번 비교
                  </div>
                </div>

              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}