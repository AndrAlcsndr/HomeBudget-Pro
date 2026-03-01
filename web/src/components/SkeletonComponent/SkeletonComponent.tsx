type SkeletonComponentProps = {
  show?: boolean
  as?: 'list' | 'file-list' | 'feed-list' | 'cards' | 'item'
  times?: number
}

function SkeletonComponent() {
  return (
    <div className="flex">
      
    </div>
  );
}
    
export default SkeletonComponent;
