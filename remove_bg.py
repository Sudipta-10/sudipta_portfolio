from PIL import Image

def remove_background(input_path, output_path, threshold=200):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # If the pixel is mostly white (above threshold for R, G, B)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            # Change to transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

remove_background("logo-icon.png", "logo-icon.png", threshold=230)
