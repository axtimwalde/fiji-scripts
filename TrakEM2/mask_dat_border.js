importPackage( Packages.ini.trakem2.display );
importPackage( Packages.mpicbg.trakem2 );
importPackage( Packages.ij );
importPackage( Packages.ij.gui );

/** Mask the wonderful grey border in the dat images */
var layers = Display.getFront().getSelection().getLayer().getParent().getLayers();
for ( var i = 0; i < layers.size(); ++i )
{
	var patches = layers.get( i ).getDisplayables( Patch );
	for ( var j = 0; j < patches.size(); ++j )
	{
		var p = patches.get( j );
		var mask = IJ.createImage( "mask", "8-bit black", p.getOWidth(), p.getOHeight(), 1 ).getProcessor();
		mask.setRoi( new Roi( 4, 4, p.getOWidth() - 8, p.getOHeight() - 8 ) );
		mask.setValue( 255 );
		mask.fill();
		p.setAlphaMask( mask );
		p.updateMipMaps();
	}
}

Display.repaint();

