import React = require('external/react');

interface ArborTypePageProps extends React.Props<ArborTypePage> {
}

export class ArborTypePage extends React.Component<ArborTypePageProps, any> {
    public render () {
        return (
            <div className='grid__section'>
                <div className='grid__container'>
                    <div className='grid__item grid__item--stack'>
                        <h1 className='type--title-1'>Type</h1>
                        <p className='type--copy-standard'>Our standard type styles now use "Atlas Grotesk" to stay follow the new Maestro style guide. We have two Type groups, titles and copy. They should provide enough range for use in a wide variety of situations.</p>
                    </div>
                </div>
                <hr className='divider divider--section' />
                <div className='grid__container grid--x-bookend'>
                    <div className='grid__item grid__item--medium--3-5 demo__element grid--x-center'>
                        <div className='grid__item--stack grid__item--medium--2-3'>
                            <h1 className='type--title-1'>Title 1 &middot; 49/63</h1>
                            <h2 className='type--title-2'>Title 2 &middot; 39/55</h2>
                            <h3 className='type--title-3'>Title 3 &middot; 31/46</h3>
                            <h4 className='type--title-4'>Title 4 &middot; 25/37</h4>
                            <h5 className='type--title-5'>Title 5 &middot; 20/32</h5>
                            <p className='type--copy-large'>Copy Large &middot; 20/32</p>
                            <p className='type--copy-standard'>Copy Standard &middot; 16/26</p>
                            <p className='type--copy-small'>Copy Small &middot; 14/24</p>
                            <p className='type--copy-mini'>Copy Mini &middot; 13/23</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
