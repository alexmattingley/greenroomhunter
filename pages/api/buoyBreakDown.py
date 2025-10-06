__author__ = 'Caleb'
from urllib.request import urlopen
from urllib.error import HTTPError, URLError
import datetime
from math import sqrt, sin,cos,atan,degrees,radians
# import numpy as np  # Removed numpy dependency
import sys
from os import path
import json
import argparse

def localDataSpec(buoy):
    try:
        f = open(path.join('c:\\node', buoy + '.data_spec'), 'r')
        d = f.read(1024)
        f.close()
        return d.split('\n')[1]
    except IOError as e:
        sys.stderr.write(str(e))
        sys.exit(1)

def httpDataSpec(buoy, dataType='data_spec'):
    """fetches most recent buoy spectra observation from ndbc
       buoy id - the buoy
       dataType - can be 'data_spec', 'swdir', or 'swdir2' for energy, mean wave direction, or primary wave direction respectively"""

    dataUrl = ''.join(['http://www.ndbc.noaa.gov/data/realtime2/', buoy, '.', dataType])
    try:
        response = urlopen(dataUrl)
    except HTTPError as e:
        sys.stderr.write(str(e))
        sys.exit(1)
    except URLError as e:
        sys.stderr.write(str(e))
        sys.exit(1)
    except Exception as e:
        sys.stderr.write(str(e))
        sys.exit(1)
    d = response.read(1024).decode('utf-8')
    return d.split('\n')[1]


def arrayDataSpec(ds, e=[0,0,0,.028,.154,1.148,.28,.28,.168,.336,.924,1.4,.63,1.078,.756,1.302,.476,.364,
     .21,.196,.308,.266,.168,.154,.266,.252,.154,.224,.126,.112,.07,.07,.056,.042,.042,.028,.028,
     .014,.014,.014,.014,.014,.014,.014] + [0] * 20):
    """needs another data set to add new energy values to. e = energy density"""
    newds = [(en, i[1], i[2]) for en, i in zip(e, ds)]
    return newds

def data_spec(datas):
    """
    returns a list of tuples for each frequency band from raw data dump
    datas is straight out of httpDataSpec
    coded for energy but works with wave direction too.
    returns energy/direction, frequency, and bandwidth
    # sep_freq = '9.999'
    # datas = data.split(sep_freq)[1]
    # bandwidths = [.005,.0075,.01,.015,.2]
    """

    errlog = []

    l = []
    # semi-hacky way of determining if data is energy or direction
    if datas.find('(') > 23:
        dstart = 23
    else:
        dstart = 16
    datas = datas[dstart:].split(') ')
    i=0
    while i < len(datas):
    # for i in datas.split(') '):
        if datas[i]:
            t = datas[i].split()
            e = float(t[0])
            f = float(t[1].strip('()'))
            if i == 0:
                b = .005
            else:
                b = f - l[i-1][1]
                # adjust the bandwidth where bandwidth transitions from .005 to .01 and .02
                if .0058 < round(b,3) < .008:
                    b = .0075
                elif .012 < round(b,3) < .018:
                    b = .015
                errlog.append(b)
                # b2 = {j: abs(b1-j) for j in bandwidths}
                # v = b2.values()
                # k = b2.keys()
                # b = k[v.index(min(v))]
            l.append((e,f,b))
        i+=1
    if __name__ != '__main__':
        print([i for i in errlog])
    return l

# def e():
#     e = [0,0,0,1.663,2.16,.648,.281,.346,.95,1.858,1.296,1.188,1.296,1.188,1.274,1.145,.389,.346,.302,.151,.13,.108,.086,.086,.086,.13,.065,.43,.086,.22,.22,.22,.22,
#          .22,.22,.22,.22,0,.22,.22,0,.22,0,0,0,0,0,0]
#     e= [0,0,0,2.511,2.7,.459,.432,.756,1.026,1.107,1.242,1.242,.891,.432,.648,.324,.351,.189,.108,.135,.081,.162,.081,.108,.054,.081,.054,.027,.054,.027,0,.027,.027] + [0]*13
#     e = [0]*6 + [.065,.52,.65,.1495,2.6,3.445,3.445,4.225,6.5,5.265,5.33,2.47,1.69,1.69,1.69,1.56,1.17,1.17,.52,.26,.585,.78,.325,.39,.455,.26,.26,.195,.13,.13,.13,.065,.13,.065] + [0]*4
#     # return e

def meanDegree(angles, e):
    """
    :param angles: a list of degrees for each frequency in the band
    :param e: the amount of energy corresponding to the angle
    This function will throw out the angle value if the energy for that value is very low.
    :return: the mean of the freq degrees. May be NoneType (null)
    """
    angles = [radians(a[0]) for a in zip(angles,e) if a[0] != 999 and a[1] > 0.005]
    alength = len(angles)
    if alength < 1:
        return None
    i,s,c=(0,)*3
    while i < alength:
        s += sin(angles[i])
        c += cos(angles[i])
        i+=1
    sbar = s / alength
    cbar = c / alength
    abar = degrees(atan(sbar/cbar))
    if cbar < 0:
        abar += 180
    elif sbar < 0:
        abar += 360
    return round(abar,1)

def band(spec, fences):
    """spec is list of dictionaries, fences is tuple containing high and low frequency for band"""
    errlog = []
    errlog.append("high / low freq fences: " + str(round(1.0/fences[1], 1)) + "(" + str(round(fences[1], 6)) + ")" \
          + ' ' + str(round(1.0/fences[0], 1)) + "(" + str(round(fences[0], 6)) + ")")
    e = [s['e'] for s in spec]
    f = [s['f'] for s in spec]
    b = [s['b'] for s in spec]
    d = [s['md'] for s in spec]

    i = 0
    if fences[1] == f[-1]:        # this is the shortest frequency so gonna use all of it
        partial1percent = 1
        i = len(f) - 1
    else:
        while i < len(f):
            # if round(b[i], 2) == .075:
            #     fend = f[i] + .004        # should come out to .105 for most buoys
            # elif round(b[i],2) == .015:
            #     fend = f[i] + .01         # should come out to .375 for 46086 & similar buoys
            # else:
            fend = f[i] + .5 * b[i]       # get high frequency / low period end of equency band
            if round(fend, 3) > fences[1]:
                # i -= 1
                break
            elif round(fend, 3) == fences[1]:
                # print f[i], i
                i += 1
                break                     # i is index of last full band now
            i+=1
        partial1 = abs(fend - fences[1])     # partial1 is band of spectra between low end of freq band and the high freq side of the fence
        partial1percent = 1 - partial1 / b[i] # find how much of the partial band we are taking, then multiply the energy by it. if fend & fences[1] are equal value of b[i] irrelevant: 0/x
    partial1e = e[i] * partial1percent    # if equal this will be zero
    partial1eb = partial1e * b[i]         # need to get the bandwidth part of the equation in here
    errlog.append("high freq fenced frequency band " + str(round(1.0/f[i], 1)) + "(" + str(round(f[i], 4)) + ") is " + str(round(partial1percent*100, 1)) + "%")
    # same as above for opposite end of fence
    j = 0
    if fences[0] == 1.0/40:
        partial2percent = 1
    else:
        while j < len(f):
            # if round(b[j], 2) == .075:
            #     fbegin = f[j] - .0035        # should come out to .105 for most buoys
            # elif round(b[j],2) == .015:
            #     fbegin = f[j] - .01         # should come out to .355 for 46086 & similar buoys
            # else:
            fbegin = f[j] + .5 * b[j]       # get low frequency / high period end of frequency band
            if round(fbegin, 3) > fences[0]:
                # j -= 1
                break
            elif round(fbegin, 3) == fences[0]:
                # print f[i], i
                j += 1
                break                     # i is index of last full band now
            j+=1
        partial2 = fbegin - fences[0]
        #     if round(f[j], 3) >= fences[0]:
        #         j -= 1
        #         # print f[j], j
        #         break
        #     j +=1
        # fbegin = f[j] + .5 * b[j]
        # partial2 = fbegin - fences[0]
        partial2percent = abs(partial2 / b[j])
    partial2e = e[j] * partial2percent
    partial2eb = partial2e * b[j]
    errlog.append("low freq fenced frequency band " + str(round(1.0/f[j], 1)) + " (" + str(round(f[j], 4)) + ") is " + str(round(partial2percent*100, 1)) + "%")
    mide = sum(e[j+1:i][k] * b[j+1:i][k] for k in range(len(e[j+1:i])))     # add up energy * bandwidth for each freq
    fullBands = f[j+1:i]
    printFullBands = ''.join([str(round(1.0/fb,4)) + ' (' + str(round(fb,4)) + ') \n' for fb in fullBands if fb > 0])
    errlog.append("middle, full frequency bands: \n" + printFullBands)
    bande = (partial2eb + mide + partial1eb) * 10000
    # provisional direction data
    meanDirection = meanDegree(d[j:i],e[j:i])
    errlog.append('mean direction: %s, # of values: %i' % (meanDirection, len(d[j:i])))

    if __name__ != "__main__":
        print([i for i in errlog])

    return bande, meanDirection

class ndbcSpectra(object):
    def __init__(self, buoy='46232',datasource='http',e=[], **kwargs):
        self.buoy = buoy
        if datasource == 'local':
            self.data = localDataSpec(buoy)
        else:
            self.data = httpDataSpec(buoy)
            self.dataPDirection = httpDataSpec(buoy, 'swdir2')
            self.dataMDirection = httpDataSpec(buoy, 'swdir')
        self.nineHeights = []
        self.nineEnergy = []
        self.nineDirections = []

        u = kwargs.get('units', 'ft') # default is to convert m to ft
        if u in ['m', 'metric', 'meters']:
            self.units = 1
        else:
            self.units = 3.28
        td = self.data[:23].split()
        self.timestamp = datetime.datetime(int(td[0]),int(td[1]),int(td[2]),int(td[3]))
        self.json = json.dumps({'buoy':self.buoy,'timestamp':self.timestamp.isoformat()})

        if e:
            ds = arrayDataSpec(data_spec(self.data),e)
        else:
            ds = data_spec(self.data)
        # Convert to list of dictionaries instead of numpy array
        self.spectra = []
        pd_data = data_spec(self.dataPDirection)
        md_data = data_spec(self.dataMDirection)
        
        for i, d in enumerate(ds):
            self.spectra.append({
                'e': float(d[0]),  # energy
                'f': float(d[1]),  # frequency  
                'b': float(d[2]),  # bandwidth
                'pd': int(pd_data[i][0]) if i < len(pd_data) else 999,  # peak direction
                'md': int(md_data[i][0]) if i < len(md_data) else 999   # mean direction
            })
        
        # Calculate significant wave height
        total_energy = sum(spectrum['e'] * spectrum['b'] for spectrum in self.spectra)
        self.Hs = self.units * 4.01 * sqrt(total_energy) # google Rayleigh distribution ocean waves for explanation of formula
        self.json = self.jsonify()

    def jsonify(self, dataType='spectra'):
        js = {'timestamp': self.timestamp.isoformat(' '), 'buoyNumber': self.buoy, 'disclaimer': "Data in this object has not been validated and should be considered a placeholder"}
        jsList = []
        digits = 3
        if dataType == 'spectra':
            keys = ['energy density', 'frequency', 'bandwidth', 'period', 'peak direction', 'mean direction']
            for spectrum in self.spectra:
                period = 1.0 / spectrum['f']
                dip = {
                    'energy density': round(spectrum['e'], digits),
                    'frequency': round(spectrum['f'], digits),
                    'bandwidth': round(spectrum['b'], digits),
                    'period': round(period, digits),
                    'peak direction': round(spectrum['pd'], digits),
                    'mean direction': round(spectrum['md'], digits)
                }
                jsList.append(dip)
        elif dataType == 'nineBand':
            b = self.nineBand()
            keys = ['22+','20','17','15','13','11','9','7','4']
            jsList = {k:{'height':v,'direction':v2} for k,v,v2 in zip(keys,b[0],b[1])}
        elif dataType in ['hp', 'heightPeriod', 'heightPeriodDirection', 'HeightPeriodDirections']:
            b = self.heightPeriodDirections()
            jsList = {round(float(p),digits):{'height':round(float(h),digits),'peak direction':round(int(pd),0),'mean direction':round(int(md),0)} for h,p,pd,md in b}

        js[dataType] = jsList

        return json.dumps(js)

    def heightPeriodDirections(self):
        """takes energy, frequency, bandwidth data and returns the height for each spectral band
        waverider buoys return 64 bands, others return ~46"""
        result = []
        for spectrum in self.spectra:
            height = self.units * 4 * 2 * sqrt(spectrum['e'] * spectrum['b'])
            period = 1.0 / spectrum['f']
            result.append([height, period, spectrum['pd'], spectrum['md']])
        return result

    def nineBand(self):
        #                                   (0.04545-0.0425)/0.005 = 0.59 or 59%
        #                                    1.0/22 - spectra2['f'][5] - spectra2['b'][5] / spectra2['b'][5]
        # band22 = np.sum(spectra2['e'][0:4]) + (spectra2['e'][4] * (1.0/22 - (spectra2['f'][4]-.5 * spectra2['b'][4])) / spectra2['b'][4])
        spectra = self.spectra
        o = 1.0
        endBand = o/2
        if spectra[-1]['f'] < endBand:
            endBand = spectra[-1]['f']
        nineBands = (o/40,o/22,o/18,o/16,o/14,o/12,o/10,o/8,o/6,endBand)
        fence = 0
        # energyList = []
        while fence < 9:
            self.nineEnergy.append(band(spectra, (nineBands[fence], nineBands[fence+1]))) # removed 10000 * .005 from this line on 4/26/16
            fence +=1
        self.nineHeights = [round(2*4*self.units*.01*sqrt(int(v[0])), 2) for v in self.nineEnergy]
        self.nineDirections = [v[1] for v in self.nineEnergy]
        if __name__ != "__main__":
            print(self.nineEnergy)
            print('buoy: ', self.buoy)
            print('time: ', self.timestamp.isoformat())
            print('9-band: ', self.nineHeights)
            print('Hs: ', self.Hs)
        return self.nineHeights, self.nineDirections

def main():
    parser = argparse.ArgumentParser(description='Process data from National Data Buoy Center (ndbc) buoys')
    parser.add_argument('--buoy', '-b', default='46232', help='Enter the buoy you want to access')
    parser.add_argument('--datasource', '-ds', default='http', choices=['http', 'local'], help='use http or local for remote / local data file')
    parser.add_argument('--json', action='store_true', help='return json data')
    parser.add_argument('--datatype', '-dt', choices=['spectra', 'nineBand', 'hp'], help='returns raw buoy spectra, wave heights in 9 bands of wave periods, or wave heights and corresponding period')
    parser.add_argument('--units', '-u', choices=['m','metric','meters','feet','english','ft'], default='feet', help='Choose the units of measurement for wave heights')

    args = vars(parser.parse_args())
    bs = ndbcSpectra(**args)
    units = 3.28
    if args['units'] in ['m','metric','meters']:
        units = 1
    if args['json']:
        if args['datatype'] == 'spectra' or args['datatype'] is None:
            print(bs.json)
        elif args['datatype'] == 'nineBand':
            print(bs.jsonify('nineBand'))
        elif args['datatype'] == 'hp':
            print(bs.jsonify('hp'))
        else:
            data = ''
        if args['datatype'] == 'spectra' or args['datatype'] is None:
            data =  bs.spectra
        elif args['datatype'] == 'nineBand':
            data = bs.nineBand()
        elif args['datatype'] == 'hp':
            data = bs.heightPeriodDirections()
        return data

if __name__ == "__main__":
    main()