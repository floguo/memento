from PIL import Image
import os

def convert_to_webp(input_path, output_path, target_size_kb=40):
    """
    Convert JPG to WebP with size optimization
    
    Args:
        input_path: Path to input JPG file
        output_path: Path to save WebP file
        target_size_kb: Target file size in kilobytes
    """
    # Open the image
    img = Image.open(input_path)
    
    # Initial quality
    quality = 80
    
    while True:
        # Try converting with current quality
        img.save(output_path, 'WEBP', quality=quality)
        
        # Check file size
        size_kb = os.path.getsize(output_path) / 1024
        
        # If size is close enough to target, we're done
        if abs(size_kb - target_size_kb) <= 5:
            break
            
        # Adjust quality based on result
        if size_kb > target_size_kb:
            quality -= 5
        else:
            quality += 5
            
        # Ensure quality stays in valid range
        quality = max(1, min(100, quality))
        
        # Break if quality hits minimum or maximum
        if quality in [1, 100]:
            break

def batch_convert(input_folder, output_folder, target_size_kb=40):
    """
    Convert all JPG files in a folder to WebP
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        
    for filename in os.listdir(input_folder):
        if filename.lower().endswith(('.jpg', '.jpeg')):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, 
                                     os.path.splitext(filename)[0] + '.webp')
            convert_to_webp(input_path, output_path, target_size_kb)
            
            # Print result
            final_size = os.path.getsize(output_path) / 1024
            print(f"Converted {filename}: {final_size:.1f}KB")

# Example usage
if __name__ == "__main__":
    # For single file
    convert_to_webp('input.jpg', 'output.webp', target_size_kb=40)
    
    # For batch conversion
    batch_convert('input_folder', 'output_folder', target_size_kb=40)