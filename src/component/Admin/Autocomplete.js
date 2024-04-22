// TODO: Implement infinite scroll autocomplete when category api has search capabilities

// import React from 'react'
// import {render} from 'react-dom'
// import {FixedSizeList as List} from 'react-window'
// import starWarsNames from 'starwars-names'
// import Downshift from 'downshift'
// import {
//   Label,
//   Menu,
//   ControllerButton,
//   Input,
//   Item,
//   ArrowIcon,
//   XIcon,
//   css,
//   getItems,
//   itemToString,
// } from '../../../shared'
// import { Form } from 'react-bootstrap'

// const Autocomplete= ({
//     items,
//     getItemProps,
//     highlightedIndex,
//     selectedItem,
//     index,style
//   }) => {
//     const item = items[index]

//     return (
//       <Item
//         {...getItemProps({
//           style: style,
//           item,
//           index: index,
//           isActive: highlightedIndex === index,
//           isSelected: selectedItem === item,
//         })}
//       >
//         {itemToString(item)}
//       </Item>
//     )
//   }

// class ExampleDownshift extends React.Component {
//   render() {
//     const {itemToString, items, listRef, ...rest} = this.props
//     return (
//       <Downshift
//         itemToString={itemToString}
//         itemCount={items.length}
//         defaultHighlightedIndex={0}
//         {...rest}
//       >
//         {({
//           getLabelProps,
//           getInputProps,
//           getToggleButtonProps,
//           getItemProps,
//           isOpen,
//           clearSelection,
//           selectedItem,
//           highlightedIndex,
//         }) => (
//           <Form {...css({width: 250, margin: 'auto', position: 'relative'})}>
//             <Label {...getLabelProps()}>Find a Star Wars character</Label>
//             <div {...css({position: 'relative'})}>
//               <Input
//                 {...getInputProps({
//                   isOpen,
//                   placeholder: 'Enter a name',
//                 })}
//               />
//               {selectedItem ? (
//                 <ControllerButton
//                   onClick={clearSelection}
//                   aria-label="clear selection"
//                 >
//                   <XIcon />
//                 </ControllerButton>
//               ) : (
//                 <ControllerButton {...getToggleButtonProps()}>
//                   <ArrowIcon isOpen={isOpen} />
//                 </ControllerButton>
//               )}
//             </div>
//             {!isOpen || !items.length ? null : (
//               <Menu>
//                 <List
//                   ref={listRef}
//                   width={300}
//                   height={items.length < 5 ? items.length * 42 : 200}
//                   itemCount={items.length}
//                   itemSize={42}
//                   itemData={{
//                     items,
//                     getItemProps,
//                     highlightedIndex,
//                     selectedItem,
//                   }}
//                 >
//                   {ItemRenderer}
//                 </List>
//               </Menu>
//             )}
//           </Form>
//         )}
//       </Downshift>
//     )
//   }
// }

// react-infinite-loader-example

// import React from "react";
// import { FixedSizeList as List } from "react-window";
// import InfiniteLoader from "react-window-infinite-loader";

// export default function ExampleWrapper({
//   // Are there more items to load?
//   // (This information comes from the most recent API request.)
//   hasNextPage,

//   // Are we currently loading a page of items?
//   // (This may be an in-flight flag in your Redux store for example.)
//   isNextPageLoading,

//   // Array of items loaded so far.
//   items,

//   // Callback function responsible for loading the next page of items.
//   loadNextPage
// }) {
//   // If there are more items to be loaded then add an extra row to hold a loading indicator.
//   const itemCount = hasNextPage ? items.length + 1 : items.length;

//   // Only load 1 page of items at a time.
//   // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
//   const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

//   // Every row is loaded except for our loading indicator row.
//   const isItemLoaded = index => !hasNextPage || index < items.length;

//   // Render an item or a loading indicator.
//   const Item = ({ index, style }) => {
//     let content;
//     if (!isItemLoaded(index)) {
//       content = "Loading...";
//     } else {
//       content = items[index].name;
//     }

//     return <div style={style}>{content}</div>;
//   };

//   return (
//     <InfiniteLoader
//       isItemLoaded={isItemLoaded}
//       itemCount={itemCount}
//       loadMoreItems={loadMoreItems}
//     >
//       {({ onItemsRendered, ref }) => (
//         <List
//           className="List"
//           height={150}
//           itemCount={itemCount}
//           itemSize={30}
//           onItemsRendered={onItemsRendered}
//           ref={ref}
//           width={300}
//         >
//           {Item}
//         </List>
//       )}
//     </InfiniteLoader>
//   );
// }
