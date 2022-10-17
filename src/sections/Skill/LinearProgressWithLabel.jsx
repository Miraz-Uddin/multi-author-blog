import ProgressBar from "@ramonak/react-progress-bar";

export default function LinearProgressWithLabel({ label, value }) {
  return (
    <div className="mb-3">
      <div className="prgs-bar fact-counter mb-2">
        <span>{label}</span>
        <div className="count wow" data-wow-duration="0ms">
          <div className="skill-percent">
            <span className="count-num" data-speed="3000" data-stop="90">
              {value}
            </span>
            %
          </div>
        </div>
      </div>
      <ProgressBar
        completed={value}
        animateOnRender={true}
        isLabelVisible={false}
        bgColor={"#ffb32f"}
        borderRadius={"0"}
      />
    </div>
  );
}
