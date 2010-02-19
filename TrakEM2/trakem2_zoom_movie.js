importClass( Packages.ini.trakem2.display.Display );
importClass( Packages.ini.trakem2.display.Patch );
importClass( Packages.java.awt.geom.AffineTransform );
importClass( Packages.java.util.HashMap );
importClass( Packages.java.lang.Thread );
importClass( Packages.ij.IJ );

var l = 200;

/* Backup affine transforms */
var layer = Display.getFrontLayer();
layer.getParent().addTransformStep( layer );

/* Block user GUI input */
layer.getProject().setReceivesInput( false );

try {

	for ( var i = 0; i < l; ++i )
	{
		var a = 0.5 - Math.cos( 2 * Math.PI * i / l ) / 2;
		
		var ats = new AffineTransform();
		var atr = new AffineTransform();
		var att = new AffineTransform();

		ats.scale( 1.0 + a * 0.03, 1.0 + a * 0.03 );
		atr.rotate( a * 0.02 );
		att.translate( 5760, 4521 );
		atti = att.clone();
		atti.invert();
		
		var d = Display.getFrontLayer().getDisplayables( Patch );
		for ( var j = 0; j < d.size(); ++j )
		{
			var atd = d.get( j ).getAffineTransform();
			
			atd.preConcatenate( atti );
			atd.preConcatenate( ats );
			atd.preConcatenate( atr );
			atd.preConcatenate( att );
			
			d.get( j ).setAffineTransform( atd );
			IJ.log( atd );
		}
		IJ.log( i );
		Display.repaint();
		Thread.sleep( 100 );

		layer.getParent().addTransformStep( layer );
	}

} catch (error) {
	IJ.log(error.toString());
}

/* Restore affine transforms */
layer.getParent().undoOneStep();

/* Enable user GUI input */
layer.getProject().setReceivesInput( true );

Display.repaint();
