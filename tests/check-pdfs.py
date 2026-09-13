"""Run after browser export: python tests/check-pdfs.py. Requires pypdf."""
from pathlib import Path
import re
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject

root=Path(__file__).resolve().parents[1]/'pdf'
live='https://jorkspace-a11y.github.io/mpbrand-assignment-jerio/'
count=0
for path in sorted(root.glob('*.pdf')):
    reader=PdfReader(path)
    texts=[page.extract_text() or '' for page in reader.pages]
    assert all('Jerio' not in text for text in texts), (path.name,'visible watermark')
    if path.name.startswith(('quotation-','invoice-')):
        assert len(reader.pages)==1,(path.name,'expected one page')
        values=['15,000,000','8,000,000'] if '-scope-' in path.name else ['8,000,000','10,000,000']
        assert all(value in texts[0] for value in values),(path.name,'price mismatch')
    writer=PdfWriter(clone_from=reader)
    for page in writer.pages:
        for ref in page.get('/Annots',[]):
            action=ref.get_object().get('/A')
            if action and '/URI' in action:
                uri=str(action['/URI'])
                assert not any(s in uri for s in ['ug.link','filemgr','file://','C:/']), (path.name,'private link')
                uri=re.sub(r'http://127\.0\.0\.1:\d+/mpbrand-assignment-jerio/',live,uri)
                action[NameObject('/URI')]=TextStringObject(uri)
    temp=path.with_suffix('.pdf.tmp')
    writer.write(temp);temp.replace(path)
    count+=len(reader.pages)
print(f'{len(list(root.glob("*.pdf")))} PDFs / {count} pages: no visible watermarks, source prices, page counts and public links checked')
