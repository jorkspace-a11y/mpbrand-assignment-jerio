"""Validate exported dimensions and make review sheets. Pass the QA output directory."""
from pathlib import Path
import sys
from PIL import Image, ImageOps, ImageDraw

root=Path(__file__).resolve().parents[1]/'artwork'
out=Path(sys.argv[1]);out.mkdir(parents=True,exist_ok=True)
frames=sorted((root/'assignment').glob('*.png'))
campaign=sorted(root.glob('campaign-*.png'))
assert len(frames)==36 and len(campaign)==15,(len(frames),len(campaign))
for path in frames+campaign:
    im=Image.open(path)
    expected=(1080,1920) if '-reel-' in path.name or '-story-' in path.name else (1080,1350)
    assert im.size==expected,(path.name,im.size)
for key,paths in [(r,[p for p in frames if p.name.startswith(r)]) for r in ['editorial','signal','studio']]+[('campaign',campaign)]:
    sheet=Image.new('RGB',(1440,520*((len(paths)+5)//6)),'#777777');draw=ImageDraw.Draw(sheet)
    for i,path in enumerate(paths):
        im=ImageOps.contain(Image.open(path).convert('RGB'),(230,470))
        x,y=(i%6)*240,(i//6)*520
        draw.text((x+5,y+5),path.stem,fill='white');sheet.paste(im,(x+(240-im.width)//2,y+25))
    sheet.save(out/f'exports-{key}.jpg',quality=93)
print('51 PNGs: expected counts and dimensions; four contact sheets saved.')
