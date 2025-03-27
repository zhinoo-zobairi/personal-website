export default function CategorySelector({ tags, selectedTag, onSelect }) {
    return (
      <div className="flex overflow-x-auto gap-3 py-2 px-1 hide-scrollbar">
        <button
            onClick={() => onSelect()}
            className={`
              px-4 py-1 rounded-full border text-sm whitespace-nowrap
              ${!selectedTag ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
            `}
        >
            All
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className={`
              px-4 py-1 rounded-full border text-sm whitespace-nowrap
              ${selectedTag === tag
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
            `}
          >
            #{tag}
          </button>
        ))}
      </div>
    );
  }
  