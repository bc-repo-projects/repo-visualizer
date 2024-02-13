import uniqueId from "lodash/uniqueId";
import React from "react";

// interface CircleTextProps {
//   r: number;
//   rotate?: number;
//   text: string;
//   style?: any;
//   fill?: string;
//   stroke?: string;
//   strokeWidth?: string;

//   id: string;
//   x: number;
//   y: number;
//   language: string;
//   color: string;
//  onMouseOver: (event: React.MouseEvent<SVGRectElement>) => void;
// }

// export const CircleText = (props: CircleTextProps) => {
//   const id = useMemo(() => uniqueId("CircleText--"), []);
//   // const { id, x, y, r, text, language, color, onMouseOver } = props;


//   return (
//       {/* <path
//         fill="none"
//         d={[
//           ["M", 0, r].join(" "),
//           ["A", r, r, 0, 0, 1, 0, -r].join(" "),
//           ["A", r, r, 0, 0, 1, 0, r].join(" "),
//         ].join(" ")}
//         id={id}
//         transform={`rotate(${rotate})`}
//         style={{ pointerEvents: "none" }}
//       >
//       </path>
//       <text textAnchor="middle" {...props}>
//         <textPath href={`#${id}`} startOffset="50%">
//           {text}
//         </textPath>
//       </text>
//     </> */}
//   );
// };


interface CircleTextProps {
 id: string;
 x: number;
 y: number;
 r: number;
 text: string;
 language: string;
 color: string;
 onMouseOver: (event: React.MouseEvent<SVGRectElement>) => void;
 onMouseEnter: (event: React.MouseEvent<SVGRectElement>) => void;
 onMouseLeave: (event: React.MouseEvent<SVGRectElement>) => void;
}

export const CircleText = (props: CircleTextProps) => {
 const { id, x, y, r, text, language, color, onMouseOver, onMouseEnter, onMouseLeave } = props;

 // ...

 return (
   <g
     id={id}
     onMouseOver={onMouseOver}
     onMouseEnter={onMouseEnter}
     onMouseLeave={onMouseLeave}
   >
     <circle
       r={r}
       cx={x}
       cy={y}
       fill={color}
       fillOpacity={0.6}
       stroke={stroke}
       strokeWidth={strokeWidth}
     />
     {showLabel && (
       <Text
         text={text}
         x={x}
         y={y}
         language={language}
         color={color}
         style={styles.label}
         fontSize={fontSize}
         fontFamily={fontFamily}
       />
     )}
   </g>
  );
};