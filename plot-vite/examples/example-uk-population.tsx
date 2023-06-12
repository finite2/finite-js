import {
  ChartTitle,
  ClipPlotRegion,
  HorizontalGridLines,
  PlotRegion,
  SVGFill,
  VerticalBarSeries,
  XAxis,
  XYPlot,
  YAxis,
} from "plot/index";
import { XYPlotProps } from "plot/plot/XYPlot";
import { PosPointerEvent } from "plot/plot/types";
import { useCallback, useRef, useReducer } from "react";

const ukPopulation = {
  year: 2020,
  notes: "last category is 105+",
  data: [
    701897, 730219, 759354, 783321, 807539, 806745, 813073, 830700, 855000, 841895, 826080, 817287,
    823732, 796700, 781315, 752712, 740693, 722928, 717252, 750095, 778930, 810303, 827261, 856602,
    860062, 858738, 884489, 887131, 914604, 931668, 914186, 905920, 913691, 891015, 897163, 894424,
    872466, 878205, 876420, 882585, 882352, 846976, 790568, 778286, 793361, 807777, 821621, 857254,
    894159, 923156, 901680, 923655, 923357, 934714, 932611, 938738, 928163, 906643, 884567, 852740,
    816209, 796532, 777771, 747241, 718065, 689198, 687334, 674764, 651687, 652398, 660817, 672642,
    702415, 753009, 575023, 549939, 540477, 494925, 435050, 383368, 386890, 373288, 350944, 322102,
    292999, 264997, 231822, 206428, 185189, 161430, 134630, 110070, 90540, 72480, 56440, 42930,
    31980, 23650, 17080, 12050, 5150, 3130, 2090, 1310, 790, 860,
  ],
};

const totalPopulation = ukPopulation.data.reduce((total, d) => total + d, 0);

const getColor =
  (selectedRange: boolean, indexMin: number, indexMax: number) => (d: number, index: number) => {
    if (!selectedRange) {
      return "var(--color-primary)";
    } else if (indexMin <= index && index <= indexMax) {
      return "var(--color-primary)";
    }
    return "var(--color-background-alt)";
  };

const getCategory = (_d: number, i: number) => i;
const getHeight = (d: number) => d;

const countRange = (indexMin: number, indexMax: number) => {
  return ukPopulation.data.reduce(
    (total, item, i) => Number(indexMin <= i && i <= indexMax) * item + total,
    0
  );
};

const getAgeRange = (indexMin: number, indexMax: number) => {
  if (indexMin === indexMax) {
    return indexMin;
  }
  return `${indexMin}-${indexMax}`;
};

const xyPlotProps: XYPlotProps = {
  xDomain: [0, 106],
  xDomainLimit: [0, 150],
  yDomain: [0, 1200000],
  yDomainLimit: [0, 1200000],
  margin: { left: 65, top: 100 },
};

const tickFormat = (t: number) =>
  t.toLocaleString(undefined, {
    notation: "compact",
    minimumSignificantDigits: 3,
  });

const style = {
  width: "100%",
  height: 500,
};

export const ExampleUKPopulation = () => {
  const [, rerender] = useReducer((s) => s + 1, 0);

  const dataRef = useRef<{
    pointerDown: boolean;
    indexMin: number;
    indexMax: number;
    selectedRange: boolean;
    lastClick?: number;
  }>({
    pointerDown: false,
    indexMin: -1,
    indexMax: 100,
    selectedRange: false,
  });

  console.log(dataRef.current);

  const onPointerMove = useCallback(
    (e: PosPointerEvent) => {
      const age = e.xPosition;

      // console.log(dataRef.current.pointerDown);

      if (dataRef.current.pointerDown) {
        if (age >= dataRef.current.indexMax) {
          dataRef.current.indexMax = age;
          rerender();
        } else if (age <= dataRef.current.indexMin) {
          dataRef.current.indexMin = age;
          rerender();
        } else if (age - dataRef.current.indexMin < dataRef.current.indexMax - age) {
          dataRef.current.indexMin = age;
        } else {
          dataRef.current.indexMax = age;
        }
      }
    },
    [rerender]
  );

  const onPointerDown = useCallback(
    (e: PosPointerEvent) => {
      const age = parseInt(e.xPosition);

      console.log(age);

      dataRef.current.selectedRange = true;
      dataRef.current.indexMin = age;
      dataRef.current.indexMax = age;
      dataRef.current.pointerDown = true;
      rerender();
    },
    [rerender]
  );

  const onPointerUp = useCallback(() => {
    if (dataRef.current.pointerDown) {
      dataRef.current.pointerDown = false;
      rerender();
    }
  }, [rerender]);

  const onDoubleClick = useCallback(() => {
    dataRef.current.selectedRange = false;
    rerender();
  }, [rerender]);

  const countedRange = countRange(dataRef.current.indexMin, dataRef.current.indexMax);

  return (
    <div style={style}>
      <SVGFill>
        <XYPlot {...xyPlotProps}>
          <ClipPlotRegion>
            <VerticalBarSeries
              data={ukPopulation.data}
              getCategory={getCategory}
              getColor={getColor(
                dataRef.current.selectedRange,
                dataRef.current.indexMin,
                dataRef.current.indexMax
              )}
              getHeight={getHeight}
              offset={0.5}
              width={1}
            />
          </ClipPlotRegion>
          <XAxis tickTotal={21} />
          <YAxis tickFormat={tickFormat} />
          <HorizontalGridLines />
          {/*<VerticalGridLines tickValues={[18, 65]} />*/}
          <PlotRegion
            fill="transparent"
            onPointerMove={onPointerMove}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onDoubleClick={onDoubleClick}
          />
          <ChartTitle>
            UK population by age in 2020 (total = {tickFormat(totalPopulation)})
            <br />
            {dataRef.current.selectedRange ? (
              <span style={{ color: "var(--color-primary" }}>
                Selected age {getAgeRange(dataRef.current.indexMin, dataRef.current.indexMax)} ={" "}
                {tickFormat(countedRange)} ({((100 * countedRange) / totalPopulation).toFixed(1)}
                %)
              </span>
            ) : (
              <br />
            )}
          </ChartTitle>
        </XYPlot>
      </SVGFill>
    </div>
  );
};
