from app.models.chunk import TranscriptChunk

def chunk_transcript(video_id: str, segments: list) -> list[TranscriptChunk]:
    """
    Splits a list of raw timed transcript segments into fixed-size overlapping text chunks
    and maps the starting character index of each chunk back to its original YouTube timestamp.
    
    Target Settings:
    - Chunk Size: 1000 characters
    - Overlap: 200 characters
    """
    
    # =========================================================================
    # STEP 1: CONCATENATE TEXT & BUILD CHARACTER-TO-TIMESTAMP MAP
    # =========================================================================
    # We combine all separate subtitle segments into a single continuous string.
    # To find the timestamp of any character in this string later, we record the
    # character index where each subtitle segment begins.
    full_text = ""
    char_offset_map = []  # Elements will be tuples: (char_start_index, segment_start_time)

    for segment in segments:
        # Determine where this segment's text will start in the combined string
        start_idx = len(full_text)
        
        # If this is not the first segment, prepend a space separator
        # and adjust the starting character index accordingly
        text_content = segment.text
        if full_text:
            full_text += " "
            start_idx += 1
            
        full_text += text_content
        
        # Record the mapping: (character_index_in_full_string, youtube_timestamp)
        char_offset_map.append((start_idx, segment.start))

    # =========================================================================
    # STEP 2: DEFINE SLIDING WINDOW MATH
    # =========================================================================
    chunk_size = 1000
    chunk_overlap = 200
    # The step size determines how far we slide the window forward.
    # If chunk size is 1000 and overlap is 200, we move forward by 800 characters.
    # This leaves the last 200 characters of the current chunk at the start of the next.
    step_size = chunk_size - chunk_overlap
    
    chunks = []
    chunk_index = 0
    text_length = len(full_text)
    
    # Edge Case: If the entire transcript is shorter than our target chunk size,
    # we package the whole text as a single chunk starting at the very beginning.
    if text_length <= chunk_size:
        start_time = segments[0].start if segments else 0.0
        chunks.append(TranscriptChunk(
            videoId=video_id,
            chunkId=f"{video_id}_chunk_{chunk_index}",
            text=full_text,
            startTime=start_time
        ))
        return chunks

    # =========================================================================
    # STEP 3: RUN SLIDING WINDOW LOOP & MAP TIMESTAMPS
    # =========================================================================
    i = 0
    while i < text_length:
        # Calculate the end index for the current slice
        end_idx = min(i + chunk_size, text_length)
        chunk_text = full_text[i:end_idx].strip()
        
        # Determine the starting timestamp for the current character position `i`.
        # We look through our map to find the last segment that started at or before
        # index `i`. Because segment positions increase chronologically, we keep updating
        # `start_time` until we hit a segment that starts AFTER our current window index `i`.
        start_time = 0.0
        for char_start, timestamp in char_offset_map:
            if char_start <= i:
                start_time = timestamp
            else:
                # Since the map is ordered, once char_start > i, all subsequent
                # segments will also be past index `i`, so we can stop searching.
                break
                
        # Build the structured chunk model
        chunks.append(TranscriptChunk(
            videoId=video_id,
            chunkId=f"{video_id}_chunk_{chunk_index}",
            text=chunk_text,
            startTime=start_time
        ))
        
        chunk_index += 1
        
        # Stop looping if we've reached the very end of the transcript
        if end_idx == text_length:
            break
            
        # Slide the window forward by 800 characters
        i += step_size

    return chunks
